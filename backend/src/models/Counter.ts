import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../services/db-service';

export class Counter extends Model {}

Counter.init(
  {
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { sequelize },
);
