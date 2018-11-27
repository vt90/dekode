/**
 * Created by vladtomsa on 27/09/2018
 */
module.exports = {
    createAddress: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 3,
                maxLength: 50,
            },
            type: {
                type: 'string',
                minLength: 3,
                maxLength: 50,
            },
            blockchainId: {
                type: 'number',
                enum: [1, 2]
            },
        },
        required: ['name', 'blockchainId', 'type'],
    },
    getAddressTransactionFlow: {
        type: 'object',
        properties: {
            address: {
                type: 'string',
                minLength: 3,
                maxLength: 50,
            },
            levelsAfter: {
                type: 'number',
                enum: [1, 2, 3]
            },
            levelsBefore: {
                type: 'number',
                enum: [1, 2, 3]
            },
            blockchainId: {
                type: 'number',
                enum: [2]
            }
        },
        required: ['address', 'blockchainId', 'levelsBefore', 'levelsAfter'],
    },
    getAddressDetails: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          minLength: 3,
          maxLength: 50,
        },
        blockchainId: {
          type: 'number',
          enum: [2]
        }
      },
      required: ['address', 'blockchainId'],
    },
};
