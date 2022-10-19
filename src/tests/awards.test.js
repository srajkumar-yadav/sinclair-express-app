import request from 'supertest';
import { Awards, User, SweepStake } from 'data/models';
import { app } from 'server/app';
import {
  buildAwards,
  buildUser,
  buildSweepStake,
  createAwards,
  createUser,
  createSweepStake,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/awards';

describe('Awards tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created awards', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const fakeAwards = await buildAwards({
      user: relFakeUser.id,
      sweepstake: relFakeSweepstake.id,
    });

    const response = await request(app).post(ENDPOINT).send(fakeAwards);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseAwards = response.body.data;

    const awards = await Awards.findByPk(responseAwards.id);

    expect(awards.user).toBe(fakeAwards.user);
    expect(awards.sweepstake).toBe(fakeAwards.sweepstake);
  });

  test('/POST - user does not exists, awards cant be created', async () => {
    const fakeAwards = await buildAwards({});
    const user = await User.findOne({ where: { id: fakeAwards.user } });
    await user.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeAwards);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - sweepstake does not exists, awards cant be created', async () => {
    const fakeAwards = await buildAwards({});
    const sweepstake = await SweepStake.findOne({ where: { id: fakeAwards.sweepstake } });
    await sweepstake.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeAwards);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a awards', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const awardsDict = await buildAwards({
      user: relFakeUser.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeAwards = await createAwards(awardsDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeAwards.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeAwards.id);

    expect(data.user).toBe(fakeAwards.user);
    expect(data.sweepstake).toBe(fakeAwards.sweepstake);
  });
  test('/GET - Response with a awards not found', async () => {
    const awardsDict = await buildAwards({});
    const fakeAwards = await createAwards(awardsDict);
    const { id } = fakeAwards;
    await fakeAwards.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of awardss', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allAwards = await Awards.findAll();
    expect(data.length).toBe(allAwards.length);
  });
  test('/PUT - Response with an updated awards', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const awardsDict = await buildAwards({
      user: relFakeUser.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeAwards = await createAwards(awardsDict);

    const anotherUserDict = await buildUser({});
    const anotherrelFakeUser = await createUser(anotherUserDict);
    const anotherSweepstakeDict = await buildSweepStake({});
    const anotherrelFakeSweepstake = await createSweepStake(anotherSweepstakeDict);

    const anotherFakeAwards = await buildAwards({
      user: anotherrelFakeUser.id,
      sweepstake: anotherrelFakeSweepstake.id,
    });

    const response = await request(app).put(`${ENDPOINT}/${fakeAwards.id}`).send({
      user: anotherFakeAwards.user,
      sweepstake: anotherFakeAwards.sweepstake,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.user).toBe(anotherFakeAwards.user);
    expect(data.sweepstake).toBe(anotherFakeAwards.sweepstake);

    const updatedAwards = await Awards.findByPk(fakeAwards.id);

    expect(updatedAwards.user).toBe(anotherFakeAwards.user);
    expect(updatedAwards.sweepstake).toBe(anotherFakeAwards.sweepstake);
  });

  test('/PUT - user does not exists, awards cant be updated', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const awardsDict = await buildAwards({
      user: relFakeUser.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeAwards = await createAwards(awardsDict);

    const anotherUserDict = await buildUser({});
    const anotherrelFakeUser = await createUser(anotherUserDict);

    awardsDict.user = anotherrelFakeUser.id;

    await anotherrelFakeUser.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeAwards.id}`).send({
      user: awardsDict.user,
      sweepstake: awardsDict.sweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - sweepstake does not exists, awards cant be updated', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const awardsDict = await buildAwards({
      user: relFakeUser.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeAwards = await createAwards(awardsDict);

    const anotherSweepstakeDict = await buildSweepStake({});
    const anotherrelFakeSweepstake = await createSweepStake(anotherSweepstakeDict);

    awardsDict.sweepstake = anotherrelFakeSweepstake.id;

    await anotherrelFakeSweepstake.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeAwards.id}`).send({
      user: awardsDict.user,
      sweepstake: awardsDict.sweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - Awards does not exists, awards cant be updated', async () => {
    const awardsDict = await buildAwards({});
    const fakeAwards = await createAwards(awardsDict);
    const { id } = fakeAwards;
    await fakeAwards.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      user: awardsDict.user,
      sweepstake: awardsDict.sweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated awards (no updates)', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const awardsDict = await buildAwards({
      user: relFakeUser.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeAwards = await createAwards(awardsDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeAwards.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/DELETE - Response with a deleted awards', async () => {
    const awardsDict = await buildAwards({});
    const fakeAwards = await createAwards(awardsDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeAwards.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeAwards.id);

    const deletedAwards = await Awards.findByPk(fakeAwards.id);
    expect(deletedAwards).toBe(null);
  });

  test('/DELETE - Awards does not exists, awards cant be deleted', async () => {
    const awardsDict = await buildAwards({});
    const fakeAwards = await createAwards(awardsDict);
    const { id } = fakeAwards;
    await fakeAwards.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
