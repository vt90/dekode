import {Router} from 'express';
import validate from 'express-validation';
import * as CrawlerBusiness from './crawler.business';
import {
    createAddress,
    updateAddress,
} from '../../validations/crawler.validation';

const
    router = Router();

router
    .route('/')
    .post(validate(createAddress), CrawlerBusiness.createAddress)
    .put(validate(updateAddress), CrawlerBusiness.updateAddresses);

export default router;

