import { Model, Sequelize, DataTypes } from 'sequelize';
import sequelize from '../sequilize';

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'users_email_unique'
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  },
  {
    sequelize,
    tableName: 'user',
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'user_id' }]
      },
      {
        name: 'users_email_unique',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'email' }]
      }
    ]
  }
);

export default User;
