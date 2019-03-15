import {Router} from 'express';
import * as TransactionBusiness from './transaction.business';

const router = Router();

router
    .route('/')
    .post(TransactionBusiness.create);

router.route('/:tx')
    .get(TransactionBusiness.list);

router.route('/forward/:tx')
    .get(TransactionBusiness.forward);

router
    .route('/transaction/:address')
    .get(TransactionBusiness.listAddressTransactions);

export default router;
