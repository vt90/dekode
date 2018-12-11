import {Router} from 'express';
import * as AddressBusinessService from './address.business';

const router = Router();

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
     *  @apiSuccess {Array} addresses
     *
     */
    .get(AddressBusinessService.list)
    .post(AddressBusinessService.create);

router.route('/:id')
    .post(AddressBusinessService.verifyAddress);

export default router;

