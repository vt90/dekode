export const addressesConstants = {
    CREATE_ADDRESS_REQUEST: "@address/CREATE_ADDRESS_REQUEST",
    CREATE_ADDRESS_SUCCESS: "@address/CREATE_ADDRESS_SUCCESS",
    CREATE_ADDRESS_FAIL: "@address/CREATE_ADDRESS_FAIL",

    GET_ADDRESS_REQUEST: "@address/GET_ADDRESS_REQUEST",
    GET_ADDRESS_SUCCESS: "@address/GET_ADDRESS_SUCCESS",
    GET_ADDRESS_FAIL: "@address/GET_ADDRESS_FAIL",


    GET_ADDRESS_SUMMARY_REQUEST: "@address/GET_ADDRESS_SUMMARY_REQUEST",
    GET_ADDRESS_SUMMARY_SUCCESS: "@address/GET_ADDRESS_SUMMARY_SUCCESS",
    GET_ADDRESS_SUMMARY_FAIL: "@address/GET_ADDRESS_SUMMARY_FAIL",

    TOGGLE_IS_VERIFIED: "@address/TOGGLE_IS_VERIFIED",
    TOGGLE_CREATE_OPEN: "@address/TOGGLE_CREATE_OPEN",

    VERIFY_ADDRESS_REQUEST: "@address/VERIFY_ADDRESS_REQUEST",
    VERIFY_ADDRESS_SUCCESS: "@address/VERIFY_ADDRESS_SUCCESS",
    VERIFY_ADDRESS_FAIL: "@address/VERIFY_ADDRESS_FAIL",
};

export const ADDRESS_TYPES = {
    UNKNOWN: '-',
    EXCHANGE: 'Exchange',
    POOLS: 'Pools',
    SERVICES: 'Services/others',
    GAMBLING: 'Gambling',
    OLD: 'Old/historic',
};

export const CREDIBILITY_TYPES = {
    VERIFIED: 'verified',
    NOT_VERIFIED: 'not verified',
};

export const FLAG_TYPES = {
    WHITE: 'white',
    GREY: 'grey',
    Black: 'black',
};
