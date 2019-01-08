import {Router} from 'express';
import validate from 'express-validation';
import * as AddressBusinessService from './address.business';
import {
    listAddresses,
    createAddress,
    updateAddress,
    filterAddresses,
} from '../../validations/address.validation';

const
    router = Router();

router
    .route('/')
    /**
     *  @api{get} /addresses?isVerified Request addresses
     *
     *  @apiParam (Query) {Boolean} isVerified=true If true returns all addresses that are verified and have status
     *  grey or black otherwise returns all addresses that are not verified and have status white or grey
     *
     *  @apiName getAddresses
     *  @apiGroup Addresses
     *
     * @apiSuccess {string}  message Success string message
     * @apiSuccess {Object[]} data array data
     *
     *
     */
    .get(validate(listAddresses), AddressBusinessService.list)
    /**
     *  @api{post} /addresses Create addresses
     *
     *  @apiParam (Body) {String[]} addresses list of addresses
     *  @apiParam (Body) {String} source addresses source
     *  @apiParam (Body) {String} text source full text
     *
     *  @apiName getAddresses
     *  @apiGroup Addresses
     *
     * @apiSuccess {string}  message Success string message
     * @apiSuccess {Object[]} data array data
     *
     *
     */
    .post(validate(createAddress), AddressBusinessService.create)
    /**
     *  @api{post} /addresses Create addresses
     *
     *  @apiParam (Body) {String[]} addresses list of addresses
     *  @apiParam (Body) {String} source addresses source
     *  @apiParam (Body) {String} text source full text
     *
     *  @apiName getAddresses
     *  @apiGroup Addresses
     *
     * @apiSuccess {string}  message Success string message
     * @apiSuccess {Object[]} data array data
     *
     *
     */
    .put(validate(updateAddress), AddressBusinessService.update);

router
    .route('/address/:address')
    /**
     *  @api{get} /addresses/address/:address Request address
     *
     *  @apiParam (Param) {String} address returns an address with sources populated
     *
     *  @apiName getAddress
     *  @apiGroup Addresses
     *
     */
    .get(AddressBusinessService.findAddress);
router
    .route('/filter')
    /**
     *  @api{get} /addresses/summary Retrieve informations about adresses
     *
     *  @apiName getAddressesSummary
     *  @apiGroup Addresses
     *
     */
    .post(validate(filterAddresses),AddressBusinessService.filterAddresses);

router
    .route('/summary')
    /**
     *  @api{get} /addresses/summary Retrieve informations about adresses
     *
     *  @apiName getAddressesSummary
     *  @apiGroup Addresses
     *
     */
    .get(AddressBusinessService.findAddressesSummary);

export default router;

