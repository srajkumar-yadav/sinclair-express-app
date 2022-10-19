import { sequelize } from '../../data/models';

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: sequelize.models.User,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'username', 'email', 'walletIndex', 'walletId'],
      },
    },
    {
      resource: sequelize.models.Game,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'startDate', 'endDate', 'status'],
      },
    },
    {
      resource: sequelize.models.SweepStake,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'startDate', 'endDate', 'status', 'type', 'totalTickets'],
      },
    },
    {
      resource: sequelize.models.UserGame,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'type', 'status'],
      },
    },
    {
      resource: sequelize.models.GameSweepStake,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id'],
      },
    },
    {
      resource: sequelize.models.Awards,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id'],
      },
    },
  ],
  branding: {
    companyName: 'Database dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const router = AdminBroExpress.buildRouter(adminBro);

export { router as adminbroRouter };
