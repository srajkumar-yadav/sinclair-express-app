import request from 'supertest';
import { GameSweepStake, Game, SweepStake } from 'data/models';
import { app } from 'server/app';
import {
  buildGameSweepStake,
  buildGame,
  buildSweepStake,
  createGameSweepStake,
  createGame,
  createSweepStake,
} from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/gameSweepStake';

describe('GameSweepStake tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created gameSweepStake', async () => {
    const relGameDict = await buildGame({});
    const relFakeGame = await createGame(relGameDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const fakeGameSweepStake = await buildGameSweepStake({
      game: relFakeGame.id,
      sweepstake: relFakeSweepstake.id,
    });

    const response = await request(app).post(ENDPOINT).send(fakeGameSweepStake);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseGameSweepStake = response.body.data;

    const gameSweepStake = await GameSweepStake.findByPk(responseGameSweepStake.id);

    expect(gameSweepStake.game).toBe(fakeGameSweepStake.game);
    expect(gameSweepStake.sweepstake).toBe(fakeGameSweepStake.sweepstake);
  });

  test('/POST - game does not exists, gameSweepStake cant be created', async () => {
    const fakeGameSweepStake = await buildGameSweepStake({});
    const game = await Game.findOne({ where: { id: fakeGameSweepStake.game } });
    await game.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeGameSweepStake);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/POST - sweepstake does not exists, gameSweepStake cant be created', async () => {
    const fakeGameSweepStake = await buildGameSweepStake({});
    const sweepstake = await SweepStake.findOne({ where: { id: fakeGameSweepStake.sweepstake } });
    await sweepstake.destroy();

    const response = await request(app).post(ENDPOINT).send(fakeGameSweepStake);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/GET - Response with a gameSweepStake', async () => {
    const relGameDict = await buildGame({});
    const relFakeGame = await createGame(relGameDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const gameSweepStakeDict = await buildGameSweepStake({
      game: relFakeGame.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeGameSweepStake.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeGameSweepStake.id);

    expect(data.gamesweepstakeId).toEqual([]);
    expect(data.game).toBe(fakeGameSweepStake.game);
    expect(data.sweepstake).toBe(fakeGameSweepStake.sweepstake);
  });
  test('/GET - Response with a gameSweepStake not found', async () => {
    const gameSweepStakeDict = await buildGameSweepStake({});
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);
    const { id } = fakeGameSweepStake;
    await fakeGameSweepStake.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of gameSweepStakes', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allGameSweepStake = await GameSweepStake.findAll();
    expect(data.length).toBe(allGameSweepStake.length);
  });
  test('/PUT - Response with an updated gameSweepStake', async () => {
    const relGameDict = await buildGame({});
    const relFakeGame = await createGame(relGameDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const gameSweepStakeDict = await buildGameSweepStake({
      game: relFakeGame.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);

    const anotherGameDict = await buildGame({});
    const anotherrelFakeGame = await createGame(anotherGameDict);
    const anotherSweepstakeDict = await buildSweepStake({});
    const anotherrelFakeSweepstake = await createSweepStake(anotherSweepstakeDict);

    const anotherFakeGameSweepStake = await buildGameSweepStake({
      game: anotherrelFakeGame.id,
      sweepstake: anotherrelFakeSweepstake.id,
    });

    const response = await request(app).put(`${ENDPOINT}/${fakeGameSweepStake.id}`).send({
      game: anotherFakeGameSweepStake.game,
      sweepstake: anotherFakeGameSweepStake.sweepstake,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.game).toBe(anotherFakeGameSweepStake.game);
    expect(data.sweepstake).toBe(anotherFakeGameSweepStake.sweepstake);

    const updatedGameSweepStake = await GameSweepStake.findByPk(fakeGameSweepStake.id);

    expect(updatedGameSweepStake.game).toBe(anotherFakeGameSweepStake.game);
    expect(updatedGameSweepStake.sweepstake).toBe(anotherFakeGameSweepStake.sweepstake);
  });

  test('/PUT - game does not exists, gameSweepStake cant be updated', async () => {
    const relGameDict = await buildGame({});
    const relFakeGame = await createGame(relGameDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const gameSweepStakeDict = await buildGameSweepStake({
      game: relFakeGame.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);

    const anotherGameDict = await buildGame({});
    const anotherrelFakeGame = await createGame(anotherGameDict);

    gameSweepStakeDict.game = anotherrelFakeGame.id;

    await anotherrelFakeGame.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeGameSweepStake.id}`).send({
      game: gameSweepStakeDict.game,
      sweepstake: gameSweepStakeDict.sweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PUT - sweepstake does not exists, gameSweepStake cant be updated', async () => {
    const relGameDict = await buildGame({});
    const relFakeGame = await createGame(relGameDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const gameSweepStakeDict = await buildGameSweepStake({
      game: relFakeGame.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);

    const anotherSweepstakeDict = await buildSweepStake({});
    const anotherrelFakeSweepstake = await createSweepStake(anotherSweepstakeDict);

    gameSweepStakeDict.sweepstake = anotherrelFakeSweepstake.id;

    await anotherrelFakeSweepstake.destroy();

    const response = await request(app).put(`${ENDPOINT}/${fakeGameSweepStake.id}`).send({
      game: gameSweepStakeDict.game,
      sweepstake: gameSweepStakeDict.sweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });

  test('/PUT - GameSweepStake does not exists, gameSweepStake cant be updated', async () => {
    const gameSweepStakeDict = await buildGameSweepStake({});
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);
    const { id } = fakeGameSweepStake;
    await fakeGameSweepStake.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      game: gameSweepStakeDict.game,
      sweepstake: gameSweepStakeDict.sweepstake,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated gameSweepStake (no updates)', async () => {
    const relGameDict = await buildGame({});
    const relFakeGame = await createGame(relGameDict);
    const relSweepstakeDict = await buildSweepStake({});
    const relFakeSweepstake = await createSweepStake(relSweepstakeDict);

    const gameSweepStakeDict = await buildGameSweepStake({
      game: relFakeGame.id,
      sweepstake: relFakeSweepstake.id,
    });
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeGameSweepStake.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/DELETE - Response with a deleted gameSweepStake', async () => {
    const gameSweepStakeDict = await buildGameSweepStake({});
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeGameSweepStake.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeGameSweepStake.id);

    const deletedGameSweepStake = await GameSweepStake.findByPk(fakeGameSweepStake.id);
    expect(deletedGameSweepStake).toBe(null);
  });

  test('/DELETE - GameSweepStake does not exists, gameSweepStake cant be deleted', async () => {
    const gameSweepStakeDict = await buildGameSweepStake({});
    const fakeGameSweepStake = await createGameSweepStake(gameSweepStakeDict);
    const { id } = fakeGameSweepStake;
    await fakeGameSweepStake.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
