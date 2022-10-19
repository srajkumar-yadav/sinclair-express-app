import request from 'supertest';
import { User } from 'data/models';
import { app } from 'server/app';
import { buildUser, createUser } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/user';

describe('User tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created user', async () => {
    const fakeUser = await buildUser({});

    const response = await request(app).post(ENDPOINT).send(fakeUser);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseUser = response.body.data;

    const user = await User.findByPk(responseUser.id);

    expect(user.username).toBe(fakeUser.username);
    expect(user.email).toBe(fakeUser.email);
    expect(user.walletIndex).toBe(fakeUser.walletIndex);
    expect(user.walletId).toBe(fakeUser.walletId);
  });

  test('/GET - Response with a user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeUser.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeUser.id);
    expect(data.username).toBe(fakeUser.username);
    expect(data.email).toBe(fakeUser.email);
    expect(data.walletIndex).toBe(fakeUser.walletIndex);
    expect(data.walletId).toBe(fakeUser.walletId);

    expect(data.userId).toEqual([]);
    expect(data.usersId).toEqual([]);
  });
  test('/GET - Response with a user not found', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of users', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allUser = await User.findAll();
    expect(data.length).toBe(allUser.length);
  });
  test('/PUT - Response with an updated user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const anotherFakeUser = await buildUser({});

    const response = await request(app).put(`${ENDPOINT}/${fakeUser.id}`).send({
      username: anotherFakeUser.username,
      email: anotherFakeUser.email,
      walletIndex: anotherFakeUser.walletIndex,
      walletId: anotherFakeUser.walletId,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.username).toBe(anotherFakeUser.username);
    expect(data.email).toBe(anotherFakeUser.email);
    expect(data.walletIndex).toBe(anotherFakeUser.walletIndex);
    expect(data.walletId).toBe(anotherFakeUser.walletId);

    const updatedUser = await User.findByPk(fakeUser.id);

    expect(updatedUser.username).toBe(anotherFakeUser.username);
    expect(updatedUser.email).toBe(anotherFakeUser.email);
    expect(updatedUser.walletIndex).toBe(anotherFakeUser.walletIndex);
    expect(updatedUser.walletId).toBe(anotherFakeUser.walletId);
  });

  test('/PUT - User does not exists, user cant be updated', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      username: userDict.username,
      email: userDict.email,
      walletIndex: userDict.walletIndex,
      walletId: userDict.walletId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated user (no updates)', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeUser.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const anotherFakeUser = await buildUser({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeUser.id}`)
      .send({ username: anotherFakeUser.username });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.username).toBe(anotherFakeUser.username);

    const updatedUser = await User.findByPk(fakeUser.id);

    expect(updatedUser.username).toBe(anotherFakeUser.username);
  });

  test('/PATCH - User does not exists, user cant be updated', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    const { username } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ username });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted user', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeUser.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeUser.id);

    const deletedUser = await User.findByPk(fakeUser.id);
    expect(deletedUser).toBe(null);
  });

  test('/DELETE - User does not exists, user cant be deleted', async () => {
    const userDict = await buildUser({});
    const fakeUser = await createUser(userDict);
    const { id } = fakeUser;
    await fakeUser.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
