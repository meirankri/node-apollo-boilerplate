import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const { db_name, db_user, db_password, db_host } = process.env;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  dialect: 'mysql'
});

const a = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
a();

export default sequelize;
