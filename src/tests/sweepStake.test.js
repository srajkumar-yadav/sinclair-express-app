import request from 'supertest';
import { SweepStake } from 'data/models';
import { app } from 'server/app';
import { buildSweepStake, createSweepStake } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/sweepStake';

describe('SweepStake tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created sweepStake', async () => {
    const fakeSweepStake = await buildSweepStake({});

    const response = await request(app).post(ENDPOINT).send(fakeSweepStake);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseSweepStake = response.body.data;

    const sweepStake = await SweepStake.findByPk(responseSweepStake.id);

    expect(sweepStake.startDate).toBe(fakeSweepStake.startDate);
    expect(sweepStake.endDate).toBe(fakeSweepStake.endDate);
    expect(sweepStake.status).toBe(fakeSweepStake.status);
    expect(sweepStake.type).toBe(fakeSweepStake.type);
    expect(sweepStake.totalTickets).toBe(fakeSweepStake.totalTickets);
  });

  test('/GET - Response with a sweepStake', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeSweepStake.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeSweepStake.id);
    expect(data.startDate).toBe(fakeSweepStake.startDate);
    expect(data.endDate).toBe(fakeSweepStake.endDate);
    expect(data.status).toBe(fakeSweepStake.status);
    expect(data.type).toBe(fakeSweepStake.type);
    expect(data.totalTickets).toBe(fakeSweepStake.totalTickets);

    expect(data.sweepStakeId).toEqual([]);
    expect(data.sweepId).toEqual([]);
  });
  test('/GET - Response with a sweepStake not found', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);
    const { id } = fakeSweepStake;
    await fakeSweepStake.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of sweepStakes', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allSweepStake = await SweepStake.findAll();
    expect(data.length).toBe(allSweepStake.length);
  });
  test('/PUT - Response with an updated sweepStake', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);

    const anotherFakeSweepStake = await buildSweepStake({});

    const response = await request(app).put(`${ENDPOINT}/${fakeSweepStake.id}`).send({
      startDate: anotherFakeSweepStake.startDate,
      endDate: anotherFakeSweepStake.endDate,
      status: anotherFakeSweepStake.status,
      type: anotherFakeSweepStake.type,
      totalTickets: anotherFakeSweepStake.totalTickets,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.startDate).toBe(anotherFakeSweepStake.startDate);
    expect(data.endDate).toBe(anotherFakeSweepStake.endDate);
    expect(data.status).toBe(anotherFakeSweepStake.status);
    expect(data.type).toBe(anotherFakeSweepStake.type);
    expect(data.totalTickets).toBe(anotherFakeSweepStake.totalTickets);

    const updatedSweepStake = await SweepStake.findByPk(fakeSweepStake.id);

    expect(updatedSweepStake.startDate).toBe(anotherFakeSweepStake.startDate);
    expect(updatedSweepStake.endDate).toBe(anotherFakeSweepStake.endDate);
    expect(updatedSweepStake.status).toBe(anotherFakeSweepStake.status);
    expect(updatedSweepStake.type).toBe(anotherFakeSweepStake.type);
    expect(updatedSweepStake.totalTickets).toBe(anotherFakeSweepStake.totalTickets);
  });

  test('/PUT - SweepStake does not exists, sweepStake cant be updated', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);
    const { id } = fakeSweepStake;
    await fakeSweepStake.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      startDate: sweepStakeDict.startDate,
      endDate: sweepStakeDict.endDate,
      status: sweepStakeDict.status,
      type: sweepStakeDict.type,
      totalTickets: sweepStakeDict.totalTickets,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated sweepStake (no updates)', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeSweepStake.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated sweepStake', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);

    const anotherFakeSweepStake = await buildSweepStake({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeSweepStake.id}`)
      .send({ startDate: anotherFakeSweepStake.startDate });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.startDate).toBe(anotherFakeSweepStake.startDate);

    const updatedSweepStake = await SweepStake.findByPk(fakeSweepStake.id);

    expect(updatedSweepStake.startDate).toBe(anotherFakeSweepStake.startDate);
  });

  test('/PATCH - SweepStake does not exists, sweepStake cant be updated', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);
    const { id } = fakeSweepStake;
    const { startDate } = fakeSweepStake;
    await fakeSweepStake.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ startDate });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted sweepStake', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeSweepStake.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeSweepStake.id);

    const deletedSweepStake = await SweepStake.findByPk(fakeSweepStake.id);
    expect(deletedSweepStake).toBe(null);
  });

  test('/DELETE - SweepStake does not exists, sweepStake cant be deleted', async () => {
    const sweepStakeDict = await buildSweepStake({});
    const fakeSweepStake = await createSweepStake(sweepStakeDict);
    const { id } = fakeSweepStake;
    await fakeSweepStake.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
