import {Router} from 'express';
import * as TransactionBusiness from './transaction.business';

const router = Router();

router
    .route('/')
    .get(TransactionBusiness.list)
    .post(TransactionBusiness.create);

router
    .route('/transaction/:address')
    .get(TransactionBusiness.listAddressTransactions);

export default router;
