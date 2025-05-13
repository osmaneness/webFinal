import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import Event from './Event';

class Participant extends Model {
  public id!: number;
  public ad!: string;
  public email!: string;
  public kayitTarihi!: string;
  public eventId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Participant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    kayitTarihi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Event,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Participant',
    tableName: 'participants',
    timestamps: true,
    underscored: true
  }
);

export default Participant; 