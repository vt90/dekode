'use strict';
module.exports = {

    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Addresses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            owner: {
                type: Sequelize.STRING
            },
            comment: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            blockchainId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
                references: {
                    model: "Blockchain",
                    key: 'id'
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('now')
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Addresses');
    }
};