'use strict';
const Blockchain = require('./index').Blockchain;

module.exports = (sequelize, DataTypes) => {
    const Addresses = sequelize.define('Addresses', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: DataTypes.STRING,
        comment: DataTypes.STRING,
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blockchainId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Blockchain,
                key: 'id'
            }
        },
    }, {});

    Addresses.associate = function (models) {
        // associations can be defined here
        Addresses.belongsTo(models.Blockchain, {
            foreignKey: 'blockchainId',
            as: 'blockchain',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });

        Addresses.hasMany(models.Reason, {
            as: 'reasonInfoList',
            foreignKey: 'addressId',
        })
    };

    return Addresses;
};