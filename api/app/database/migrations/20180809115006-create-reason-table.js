'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Reason', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            message: {
                type: Sequelize.STRING
            },
            source: {
                type: Sequelize.STRING
            },
            addressId: {
                type: Sequelize.INTEGER,
                foreignKey: true,
                references: {
                    model: "Addresses",
                    key: "id"
                }
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
        return queryInterface.dropTable('Reason');
    }
};