import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';

class Event extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public images!: string[];
  public slug!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
      get() {
        const rawValue = this.getDataValue('images');
        return rawValue ? JSON.parse(JSON.stringify(rawValue)) : [];
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: true
  }
);

export default Event; 