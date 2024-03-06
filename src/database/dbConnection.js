const Sequelize = require('sequelize');

let db;
let username;
let password;
let host;
let sequelize;
if (process.env.NODE_ENV === 'development') {
    db = process.env.DEV_DATABASE;
    username = process.env.DEV_USERNAME;
    password = process.env.DEV_PASSWORD;
    host = 'localhost';

    sequelize = new Sequelize(db, username, password, {
        host: host,
        dialect: 'postgres',
    });
} else {
    db = process.env.DATABASE;
    username = process.env.DB_USERNAME;
    password = process.env.DB_PASSWORD;
    host = process.env.HOST || 'localhost';

    sequelize = new Sequelize(db, username, password, {
        host: host,
        dialect: 'postgres',
    });
}

// sequelize.sync({force:true})

sequelize
    .authenticate()
    .then(() => console.log('database connection established'))
    .catch((err) => console.log(err));

module.exports = sequelize;
