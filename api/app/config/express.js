/**
 * Created by vladtomsa on 27/09/2018
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('express-bunyan-logger');
const routesConfig = require('../routes');
const { reqBodyValidatorMiddleware } = require('../middlewares');

const init = (app, cb) => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(logger());

    // Add app routes
    routesConfig.forEach((route) => {
        app.use(`/api${route.path}`, route.router);
    });

    // Error handler for validation errors
    app.use(reqBodyValidatorMiddleware);

    cb(null);
};

module.exports = {
    init,
};