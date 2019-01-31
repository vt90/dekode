import httpStatus from 'http-status';
import {Router} from 'express';
import AddressModule from './address';
import TransactionModule from './transaction';
import BlockModule from './block';
import CrawlerModule from './crawler';

const router = Router();

router.get('/status', (req, res) => res.status(httpStatus.OK).send('OK'));
// router.get('/', (req, res) => res.status(httpStatus.OK).send('OK'));

router.use('/addresses', AddressModule);
router.use('/transactions', TransactionModule);
router.use('/blocks', BlockModule);

//private rotues
router.use('/api/crawlers', CrawlerModule);

export default router;
