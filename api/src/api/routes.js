import httpStatus from 'http-status';
import {Router} from 'express';
import AddressModule from './address';

const router = Router();

router.get('/status', (req, res) => res.status(httpStatus.OK).send('OK'));
router.get('/', (req, res) => res.status(httpStatus.OK).send('OK'));

router.use('/addresses', AddressModule);

export default router;
