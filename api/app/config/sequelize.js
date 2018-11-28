/**
 * Created by vladtomsa on 27/09/2018
 */
const Sequelize = require('sequelize');
let sequelizeInstance = null;

const init = (app, cb) => {
    const {
        database: {
            database,
            username,
            password,
            host,
            dialect,
            port,
            pool,
        }
    } = app.get('config');

    const dbDatabase = process.env['DB_DATABASE'] || database;
    const dbHost = process.env['DB_HOST'] || host;
    const dbUsername = process.env['DB_USERNAME'] || username;
    const dbPassword = process.env['DB_PASSWORD'] || password;

    const sequelizeOptions = {
      operatorsAliases: false,
      host: dbHost,
      dialect,
      port,
      pool,
      logging: null,
    };

    const sequelize = new Sequelize(
        dbDatabase,
        dbUsername,
        dbPassword,
        sequelizeOptions
    );

    sequelizeInstance = sequelize;

    sequelize
        .authenticate()
        .then(async () => {
            console.log('Connection to database has been established successfully!');
            app.set('sequelize', sequelize);

            return cb(null, sequelize);
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);

            return cb(err);
        });
};

module.exports = {
    init,
    getInstance: () => sequelizeInstance,
};
