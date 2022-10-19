const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/user/': {
      get: {
        summary: 'Lists all the users',
        tags: ['user'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      post: {
        summary: 'Creates a user',
        tags: ['user'],
        parameters: [
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new user',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        },
      },
    },
    '/user/{id}': {
      get: {
        summary: 'Gets a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a user with primary key',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a user by its primary key',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a user',
        tags: ['user'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      patch: {
        tags: ['user'],
        summary: 'patch a user',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/User',
            },
          },
          {
            name: 'user',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUser',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a user and its partially overwritten values',
            schema: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
    },

    '/game/': {
      get: {
        summary: 'Lists all the games',
        tags: ['game'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Game',
            },
          },
        },
      },
      post: {
        summary: 'Creates a game',
        tags: ['game'],
        parameters: [
          {
            name: 'game',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGame',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new game',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGame',
            },
          },
        },
      },
    },
    '/game/{id}': {
      get: {
        summary: 'Gets a game by its primary key',
        tags: ['game'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a game with primary key',
            schema: {
              $ref: '#/definitions/Game',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a game by its primary key',
        tags: ['game'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a game',
        tags: ['game'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Game',
            },
          },
          {
            name: 'game',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGame',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a game',
            schema: {
              $ref: '#/definitions/Game',
            },
          },
        },
      },
      patch: {
        tags: ['game'],
        summary: 'patch a game',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Game',
            },
          },
          {
            name: 'game',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGame',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a game and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Game',
            },
          },
        },
      },
    },

    '/sweepStake/': {
      get: {
        summary: 'Lists all the sweepStakes',
        tags: ['sweepStake'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/SweepStake',
            },
          },
        },
      },
      post: {
        summary: 'Creates a sweepStake',
        tags: ['sweepStake'],
        parameters: [
          {
            name: 'sweepStake',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateSweepStake',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new sweepStake',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateSweepStake',
            },
          },
        },
      },
    },
    '/sweepStake/{id}': {
      get: {
        summary: 'Gets a sweepStake by its primary key',
        tags: ['sweepStake'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a sweepStake with primary key',
            schema: {
              $ref: '#/definitions/SweepStake',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a sweepStake by its primary key',
        tags: ['sweepStake'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a sweepStake',
        tags: ['sweepStake'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/SweepStake',
            },
          },
          {
            name: 'sweepStake',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateSweepStake',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a sweepStake',
            schema: {
              $ref: '#/definitions/SweepStake',
            },
          },
        },
      },
      patch: {
        tags: ['sweepStake'],
        summary: 'patch a sweepStake',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/SweepStake',
            },
          },
          {
            name: 'sweepStake',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateSweepStake',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a sweepStake and its partially overwritten values',
            schema: {
              $ref: '#/definitions/SweepStake',
            },
          },
        },
      },
    },

    '/userGame/': {
      get: {
        summary: 'Lists all the userGames',
        tags: ['userGame'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/UserGame',
            },
          },
        },
      },
      post: {
        summary: 'Creates a userGame',
        tags: ['userGame'],
        parameters: [
          {
            name: 'userGame',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUserGame',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new userGame',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUserGame',
            },
          },
        },
      },
    },
    '/userGame/{id}': {
      get: {
        summary: 'Gets a userGame by its primary key',
        tags: ['userGame'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a userGame with primary key',
            schema: {
              $ref: '#/definitions/UserGame',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a userGame by its primary key',
        tags: ['userGame'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a userGame',
        tags: ['userGame'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/UserGame',
            },
          },
          {
            name: 'userGame',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUserGame',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a userGame',
            schema: {
              $ref: '#/definitions/UserGame',
            },
          },
        },
      },
      patch: {
        tags: ['userGame'],
        summary: 'patch a userGame',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/UserGame',
            },
          },
          {
            name: 'userGame',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateUserGame',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a userGame and its partially overwritten values',
            schema: {
              $ref: '#/definitions/UserGame',
            },
          },
        },
      },
    },

    '/gameSweepStake/': {
      get: {
        summary: 'Lists all the gameSweepStakes',
        tags: ['gameSweepStake'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/GameSweepStake',
            },
          },
        },
      },
      post: {
        summary: 'Creates a gameSweepStake',
        tags: ['gameSweepStake'],
        parameters: [
          {
            name: 'gameSweepStake',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGameSweepStake',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new gameSweepStake',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGameSweepStake',
            },
          },
        },
      },
    },
    '/gameSweepStake/{id}': {
      get: {
        summary: 'Gets a gameSweepStake by its primary key',
        tags: ['gameSweepStake'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a gameSweepStake with primary key',
            schema: {
              $ref: '#/definitions/GameSweepStake',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a gameSweepStake by its primary key',
        tags: ['gameSweepStake'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a gameSweepStake',
        tags: ['gameSweepStake'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/GameSweepStake',
            },
          },
          {
            name: 'gameSweepStake',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGameSweepStake',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a gameSweepStake',
            schema: {
              $ref: '#/definitions/GameSweepStake',
            },
          },
        },
      },
      patch: {
        tags: ['gameSweepStake'],
        summary: 'patch a gameSweepStake',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/GameSweepStake',
            },
          },
          {
            name: 'gameSweepStake',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateGameSweepStake',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a gameSweepStake and its partially overwritten values',
            schema: {
              $ref: '#/definitions/GameSweepStake',
            },
          },
        },
      },
    },

    '/awards/': {
      get: {
        summary: 'Lists all the awardss',
        tags: ['awards'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Awards',
            },
          },
        },
      },
      post: {
        summary: 'Creates a awards',
        tags: ['awards'],
        parameters: [
          {
            name: 'awards',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAwards',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new awards',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAwards',
            },
          },
        },
      },
    },
    '/awards/{id}': {
      get: {
        summary: 'Gets a awards by its primary key',
        tags: ['awards'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'Returns a awards with primary key',
            schema: {
              $ref: '#/definitions/Awards',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a awards by its primary key',
        tags: ['awards'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a awards',
        tags: ['awards'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Awards',
            },
          },
          {
            name: 'awards',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAwards',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a awards',
            schema: {
              $ref: '#/definitions/Awards',
            },
          },
        },
      },
      patch: {
        tags: ['awards'],
        summary: 'patch a awards',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Awards',
            },
          },
          {
            name: 'awards',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateAwards',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a awards and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Awards',
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        username: {
          type: 'string',
          maxLength: 255,
        },
        email: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        walletIndex: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        walletId: {
          type: 'string',
          maxLength: 255,
        },
        userId: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
        usersId: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Game: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          maxLength: 255,
        },
        gameId: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    SweepStake: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          maxLength: 255,
        },
        type: {
          type: 'string',
          maxLength: 255,
        },
        totalTickets: {
          type: 'integer',
          format: 'int32',
        },
        sweepStakeId: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
        sweepId: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    UserGame: {
      required: ['user', 'gamesweepstake'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        type: {
          type: 'string',
          maxLength: 255,
        },
        status: {
          type: 'string',
          maxLength: 255,
        },
        user: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        gamesweepstake: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
      },
    },

    GameSweepStake: {
      required: ['game', 'sweepstake'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        game: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        sweepstake: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        gamesweepstakeId: {
          type: 'array',
          items: {
            type: 'integer',
            format: 'int32',
          },
          uniqueItems: true,
        },
      },
    },

    Awards: {
      required: ['user', 'sweepstake'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        user: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        sweepstake: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateUser: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        username: {
          type: 'string',
          maxLength: 255,
        },
        email: {
          type: 'string',
          uniqueItems: true,
          maxLength: 255,
        },
        walletIndex: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        walletId: {
          type: 'string',
          maxLength: 255,
        },
      },
    },

    CreateUpdateGame: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          maxLength: 255,
        },
      },
    },

    CreateUpdateSweepStake: {
      required: [],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        startDate: {
          type: 'string',
          format: 'date',
        },
        endDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          maxLength: 255,
        },
        type: {
          type: 'string',
          maxLength: 255,
        },
        totalTickets: {
          type: 'integer',
          format: 'int32',
        },
      },
    },

    CreateUpdateUserGame: {
      required: ['user', 'gamesweepstake'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        type: {
          type: 'string',
          maxLength: 255,
        },
        status: {
          type: 'string',
          maxLength: 255,
        },
        user: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        gamesweepstake: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
      },
    },

    CreateUpdateGameSweepStake: {
      required: ['game', 'sweepstake'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        game: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        sweepstake: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
      },
    },

    CreateUpdateAwards: {
      required: ['user', 'sweepstake'],
      properties: {
        id: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
          readOnly: true,
        },
        user: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
        sweepstake: {
          type: 'integer',
          format: 'int32',
          uniqueItems: true,
        },
      },
    },
  },
};

export { swaggerDocument };
