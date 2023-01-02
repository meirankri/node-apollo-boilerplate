require('dotenv').config();
const {db_name, db_user, db_password, db_host} = process.env;

module.exports = {
  development: {
    username: db_user,
    password: db_password,
    database: db_name,
    host: db_host,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
