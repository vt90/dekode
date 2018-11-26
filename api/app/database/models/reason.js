/**
 * Created by vladtomsa on 23/11/2018
 */
const Address = require('./index').Address;

module.exports = (sequelize, DataTypes) => {
    const Reason = sequelize.define('Reason', {
        message: DataTypes.STRING,
        source: DataTypes.STRING,
        addressId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Address,
                key: 'id'
            }
        },
    }, {});

    Reason.associate = function (models) {
        // associations can be defined here
        Reason.belongsTo(models.Addresses, {
            foreignKey: 'addressId',
            as: 'address',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    };

    return Reason;
};