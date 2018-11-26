'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Blockchain', [
        {
            name: 'Bitcoin',
            token: 'BTC',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Ethereum',
            token: 'ETH',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Blockchain', { name: [
          "Bitcoin",
          "Ethereum",
      ]}, {})
  }
};