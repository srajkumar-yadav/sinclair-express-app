import request from 'supertest';
import { Game } from 'data/models';
import { app } from 'server/app';
import { buildGame, createGame } from './factories';
import { startDatabase } from './utils';

const ENDPOINT = '/game';

describe('Game tests', () => {
  beforeEach(async () => {
    await startDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  test('/POST - Response with a new created game', async () => {
    const fakeGame = await buildGame({});

    const response = await request(app).post(ENDPOINT).send(fakeGame);

    expect(response.status).toBe(201);
    expect(response.statusCode).toBe(201);

    const responseGame = response.body.data;

    const game = await Game.findByPk(responseGame.id);

    expect(game.startDate).toBe(fakeGame.startDate);
    expect(game.endDate).toBe(fakeGame.endDate);
    expect(game.status).toBe(fakeGame.status);
  });

  test('/GET - Response with a game', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);

    const response = await request(app).get(`${ENDPOINT}/${fakeGame.id}`);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    expect(data.id).toBe(fakeGame.id);
    expect(data.startDate).toBe(fakeGame.startDate);
    expect(data.endDate).toBe(fakeGame.endDate);
    expect(data.status).toBe(fakeGame.status);

    expect(data.gameId).toEqual([]);
  });
  test('/GET - Response with a game not found', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);
    const { id } = fakeGame;
    await fakeGame.destroy();

    const response = await request(app).get(`${ENDPOINT}/${id}`);
    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/GET - Response with a list of games', async () => {
    const response = await request(app).get(ENDPOINT);

    const { statusCode, status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(statusCode).toBe(200);

    const allGame = await Game.findAll();
    expect(data.length).toBe(allGame.length);
  });
  test('/PUT - Response with an updated game', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);

    const anotherFakeGame = await buildGame({});

    const response = await request(app).put(`${ENDPOINT}/${fakeGame.id}`).send({
      startDate: anotherFakeGame.startDate,
      endDate: anotherFakeGame.endDate,
      status: anotherFakeGame.status,
    });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.startDate).toBe(anotherFakeGame.startDate);
    expect(data.endDate).toBe(anotherFakeGame.endDate);
    expect(data.status).toBe(anotherFakeGame.status);

    const updatedGame = await Game.findByPk(fakeGame.id);

    expect(updatedGame.startDate).toBe(anotherFakeGame.startDate);
    expect(updatedGame.endDate).toBe(anotherFakeGame.endDate);
    expect(updatedGame.status).toBe(anotherFakeGame.status);
  });

  test('/PUT - Game does not exists, game cant be updated', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);
    const { id } = fakeGame;
    await fakeGame.destroy();

    const response = await request(app).put(`${ENDPOINT}/${id}`).send({
      startDate: gameDict.startDate,
      endDate: gameDict.endDate,
      status: gameDict.status,
    });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/PATCH - Response with an updated game (no updates)', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);

    const response = await request(app).patch(`${ENDPOINT}/${fakeGame.id}`).send({});

    const { status } = response;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test('/PATCH - Response with an updated game', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);

    const anotherFakeGame = await buildGame({});

    const response = await request(app)
      .patch(`${ENDPOINT}/${fakeGame.id}`)
      .send({ startDate: anotherFakeGame.startDate });

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.startDate).toBe(anotherFakeGame.startDate);

    const updatedGame = await Game.findByPk(fakeGame.id);

    expect(updatedGame.startDate).toBe(anotherFakeGame.startDate);
  });

  test('/PATCH - Game does not exists, game cant be updated', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);
    const { id } = fakeGame;
    const { startDate } = fakeGame;
    await fakeGame.destroy();

    const response = await request(app).patch(`${ENDPOINT}/${id}`).send({ startDate });

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
  test('/DELETE - Response with a deleted game', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);

    const response = await request(app).delete(`${ENDPOINT}/${fakeGame.id}`);

    const { status } = response;
    const { data } = response.body;

    expect(status).toBe(200);
    expect(response.statusCode).toBe(200);

    expect(data.id).toBe(fakeGame.id);

    const deletedGame = await Game.findByPk(fakeGame.id);
    expect(deletedGame).toBe(null);
  });

  test('/DELETE - Game does not exists, game cant be deleted', async () => {
    const gameDict = await buildGame({});
    const fakeGame = await createGame(gameDict);
    const { id } = fakeGame;
    await fakeGame.destroy();

    const response = await request(app).delete(`${ENDPOINT}/${id}`);

    const { statusCode } = response;
    expect(statusCode).toBe(404);
  });
});
