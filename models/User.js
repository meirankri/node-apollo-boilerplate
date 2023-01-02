import { DataTypes } from 'sequelize';
import sequelize from '../db/sequilize';

export default function () {
  return sequelize.define(
    'User',
    {
      userId: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'User',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'userId' }]
        }
      ]
    }
  );
}
