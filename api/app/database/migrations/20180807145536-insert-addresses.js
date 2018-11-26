'use strict';

const ETH_ADDRESSES = [
    '0x3424fb94b22526bff9cd5ea8f83b15827b4dd498',
    '0xb15a5332eb7cd2dd7a4ec7f96749e769a371572d',
];

module.exports = {
    up: (queryInterface, Sequelize) => {
        const now = new Date();

        const addresses = ETH_ADDRESSES.map((address) => {
            return {
                name: address,
                blockchainId: 2,
                createdAt: now,
                updatedAt: now,
            }
        });

        return queryInterface.bulkInsert('Addresses', addresses);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Addresses', ETH_ADDRESSES, {})
    }
};