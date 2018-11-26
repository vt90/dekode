/**
 * Created by vladtomsa on 27/09/2018
 */
'use strict';
const express = require('express');
const addressesController = require('../../controllers').addressesController;
const validate = require('../../helpers/requestValidator');
const validationSchema = require('./validation');

const router = express.Router();
const path = "/addresses";

router
    .route('/')
    .get((req, res) => {
        addressesController.list({})
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    })
    .post(validate({body: validationSchema.createAddress}), (req, res) => {
        addressesController.create(req.body)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    });

router
    .route('/transaction-flow')
    .post(validate({body: validationSchema.getAddressTransactionFlow}), (req, res) => {
        addressesController.getTransactionsFlow(req.body)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(400).send(error.message);
            });
    });

module.exports = {
    router,
    path,
};