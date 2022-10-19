import request from 'supertest';
import { UserGame, User, GameSweepStake } from 'data/models';
import { app } from 'server/app';
import {
  buildUserGame,
  buildUser,
  buildGameSweepStake,
  createUserGame,
  createUser,
  createGameSweepStake,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/userGame';

describe('UserGame tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created userGame', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const fakeUserGame = await buildUserGame({
      user: relFakeUser.id,
      gamesweepstake: relFakeGamesweepstake.id,
    });

    const response = await request(app).post(ENDPOINT).send(fakeUserGame);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseUserGame = response.body.data;

    const userGame = await UserGame.findByPk(responseUserGame.id);

    expect(userGame.type).toBe(fakeUserGame.type);
    expect(userGame.status).toBe(fakeUserGame.status);

    expect(userGame.user).toBe(fakeUserGame.user);
    expect(userGame.gamesweepstake).toBe(fakeUserGame.gamesweepstake);
  });

  test('/POST - user does not exists, userGame cant be created', async () => {
    const fakeUserGame = await buildUserGame({});
    const user = await User.findOne({ where: { id: fakeUserGame.user } });
    await user.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeUserGame);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - gamesweepstake does not exists, userGame cant be created', async () => {
    const fakeUserGame = await buildUserGame({});
    const gamesweepstake = await GameSweepStake.findOne({
      where: { id: fakeUserGame.gamesweepstake },
    });
    await gamesweepstake.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeUserGame);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a userGame', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const userGameDict = await buildUserGame({
      user: relFakeUser.id,
      gamesweepstake: relFakeGamesweepstake.id,
    });
    const fakeUserGame = await createUserGame(userGameDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeUserGame.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeUserGame.id);
    expect(data.type).toBe(fakeUserGame.type);
    expect(data.status).toBe(fakeUserGame.status);

    expect(data.user).toBe(fakeUserGame.user);
    expect(data.gamesweepstake).toBe(fakeUserGame.gamesweepstake);
  });
  test('/GET - Response with a userGame not found', async () => {
    const userGameDict = await buildUserGame({});
    const fakeUserGame = await createUserGame(userGameDict);
    const { id } = fakeUserGame;
    await fakeUserGame.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of userGames', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allUserGame = await UserGame.findAll();
    expect(data.length).toBe(allUserGame.length);
  });
  test('/PUT - Response with an updated userGame', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const userGameDict = await buildUserGame({
      user: relFakeUser.id,
      gamesweepstake: relFakeGamesweepstake.id,
    });
    const fakeUserGame = await createUserGame(userGameDict);

    const anotherUserDict = await buildUser({});
    const anotherrelFakeUser = await createUser(anotherUserDict);
    const anotherGamesweepstakeDict = await buildGameSweepStake({});
    const anotherrelFakeGamesweepstake = await createGameSweepStake(anotherGamesweepstakeDict);

    const anotherFakeUserGame = await buildUserGame({
      user: anotherrelFakeUser.id,
      gamesweepstake: anotherrelFakeGamesweepstake.id,
    });

    const response = await request(app).put(`${ENDPOINT}/${fakeUserGame.id}`).send({
      type: anotherFakeUserGame.type,
      status: anotherFakeUserGame.status,
      user: anotherFakeUserGame.user,
      gamesweepstake: anotherFakeUserGame.gamesweepstake,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.type).toBe(anotherFakeUserGame.type);
    expect(data.status).toBe(anotherFakeUserGame.status);
    expect(data.user).toBe(anotherFakeUserGame.user);
    expect(data.gamesweepstake).toBe(anotherFakeUserGame.gamesweepstake);

    const updatedUserGame = await UserGame.findByPk(fakeUserGame.id);

    expect(updatedUserGame.type).toBe(anotherFakeUserGame.type);
    expect(updatedUserGame.status).toBe(anotherFakeUserGame.status);

    expect(updatedUserGame.user).toBe(anotherFakeUserGame.user);
    expect(updatedUserGame.gamesweepstake).toBe(anotherFakeUserGame.gamesweepstake);
  });

  test('/PUT - user does not exists, userGame cant be updated', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const userGameDict = await buildUserGame({
      user: relFakeUser.id,
      gamesweepstake: relFakeGamesweepstake.id,
    });
    const fakeUserGame = await createUserGame(userGameDict);

    const anotherUserDict = await buildUser({});
    const anotherrelFakeUser = await createUser(anotherUserDict);

    userGameDict.user = anotherrelFakeUser.id;

    await anotherrelFakeUser.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeUserGame.id}`).send({
      type: userGameDict.type,
      status: userGameDict.status,
      user: userGameDict.user,
      gamesweepstake: userGameDict.gamesweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - gamesweepstake does not exists, userGame cant be updated', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const userGameDict = await buildUserGame({
      user: relFakeUser.id,
      gamesweepstake: relFakeGamesweepstake.id,
    });
    const fakeUserGame = await createUserGame(userGameDict);

    const anotherGamesweepstakeDict = await buildGameSweepStake({});
    const anotherrelFakeGamesweepstake = await createGameSweepStake(anotherGamesweepstakeDict);

    userGameDict.gamesweepstake = anotherrelFakeGamesweepstake.id;

    await anotherrelFakeGamesweepstake.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeUserGame.id}`).send({
      type: userGameDict.type,
      status: userGameDict.status,
      user: userGameDict.user,
      gamesweepstake: userGameDict.gamesweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - UserGame does not exists, userGame cant be updated', async () => {
    const userGameDict = await buildUserGame({});
    const fakeUserGame = await createUserGame(userGameDict);
    const { id } = fakeUserGame;
    await fakeUserGame.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      type: userGameDict.type,
      status: userGameDict.status,
      user: userGameDict.user,
      gamesweepstake: userGameDict.gamesweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated userGame (no updates)', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const userGameDict = await buildUserGame({
      user: relFakeUser.id,
      gamesweepstake: relFakeGamesweepstake.id,
    });
    const fakeUserGame = await createUserGame(userGameDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeUserGame.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated userGame', async () => {
    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);
    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const userGameDict = await buildUserGame({
      user: relFakeUser.id,
      gamesweepstake: relFakeGamesweepstake.id,
    });
    const fakeUserGame = await createUserGame(userGameDict);

    const anotherUserDict = await buildUser({});
    const anotherrelFakeUser = await createUser(anotherUserDict);
    const anotherGamesweepstakeDict = await buildGameSweepStake({});
    const anotherrelFakeGamesweepstake = await createGameSweepStake(anotherGamesweepstakeDict);

    const anotherFakeUserGame = await buildUserGame({
      user: anotherrelFakeUser.id,
      gamesweepstake: anotherrelFakeGamesweepstake.id,
    });

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeUserGame.id}`)
      .send({ type: anotherFakeUserGame.type });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.type).toBe(anotherFakeUserGame.type);

    const updatedUserGame = await UserGame.findByPk(fakeUserGame.id);

    expect(updatedUserGame.type).toBe(anotherFakeUserGame.type);
  });

  test('/PATCH - user does not exists, userGame cant be updated', async () => {
    const userGameDict = await buildUserGame({});
    const fakeUserGame = await createUserGame(userGameDict);

    const relUserDict = await buildUser({});
    const relFakeUser = await createUser(relUserDict);

    const relFakeUserId = relFakeUser.id;
    await relFakeUser.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeUserGame.id}`).send({
      user: relFakeUserId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - gamesweepstake does not exists, userGame cant be updated', async () => {
    const userGameDict = await buildUserGame({});
    const fakeUserGame = await createUserGame(userGameDict);

    const relGamesweepstakeDict = await buildGameSweepStake({});
    const relFakeGamesweepstake = await createGameSweepStake(relGamesweepstakeDict);

    const relFakeGamesweepstakeId = relFakeGamesweepstake.id;
    await relFakeGamesweepstake.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${fakeUserGame.id}`).send({
      gamesweepstake: relFakeGamesweepstakeId,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PATCH - UserGame does not exists, userGame cant be updated', async () => {
    const userGameDict = await buildUserGame({});
    const fakeUserGame = await createUserGame(userGameDict);
    const { id } = fakeUserGame;
    const { type } = fakeUserGame;
    await fakeUserGame.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ type });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted userGame', async () => {
    const userGameDict = await buildUserGame({});
    const fakeUserGame = await createUserGame(userGameDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeUserGame.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeUserGame.id);

    const deletedUserGame = await UserGame.findByPk(fakeUserGame.id);
    expect(deletedUserGame).toBe(null);
  });

  test('/DELETE - UserGame does not exists, userGame cant be deleted', async () => {
    const userGameDict = await buildUserGame({});
    const fakeUserGame = await createUserGame(userGameDict);
    const { id } = fakeUserGame;
    await fakeUserGame.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
