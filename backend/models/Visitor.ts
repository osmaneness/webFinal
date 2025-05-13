import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Visitor extends Model {
  public id!: number;
  public count!: number;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Visitor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Visitor',
  }
);

export default Visitor; 