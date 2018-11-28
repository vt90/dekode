/**
 * Created by vladtomsa on 27/09/2018
 */
const async = require('async');
const path = require('path');
const express = require('express');
const ENV = process.env.NODE_ENV || 'development';
const config = require('../config')[ENV];
const PORT = process.env.PORT || config.api.port;
const serverModulesConfigs = require('./config');
const app = express();

async.auto(
  {
    config: (cb) => {
      app.set('config', config);

      // app.get('/*', express.static(path.join(__dirname, 'build-ui')));

      app.use(express.static(path.join(__dirname, 'build-ui')));

      return cb(null);
    },

    database: ['config', (scope, cb) => {
      serverModulesConfigs.sequelize.init(app, (error) => cb(error));
      serverModulesConfigs.umzug.syncDatabase();
    }],

    express: ['database', (scope, cb) => {
      serverModulesConfigs.express.init(app, (error) => cb(error))
    }],

  },
  (error) => {
    if (error) console.log(error);
    else {
      app.listen(PORT, () => {
        console.info('***************************************************');
        console.info('Server started on http://localhost:%s', PORT);
        console.info('***************************************************');
      });
    }
  }
);

