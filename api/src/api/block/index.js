import {Router} from 'express';
import * as BlockBuisiness from './block.buisiness';

const router = Router();

router
    .route('/:hash')
    .get(BlockBuisiness.findBlock);

router
    .route('/api/blocks')
    .post(BlockBuisiness.create);
export default router;
