/**
 * Created by vladtomsa on 23/11/2018
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Blockchain = sequelize.define('Blockchain', {
        name: DataTypes.STRING,
        token: DataTypes.STRING
    }, {});

    Blockchain.associate = function(models) {
        Blockchain.hasMany(models.Addresses, {
            as: 'addressInfoList',
            foreignKey: 'blockchainId',
        })
    };

    return Blockchain;
};