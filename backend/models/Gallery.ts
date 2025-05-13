import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Gallery extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public images!: string[];
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Gallery.init(
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
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Gallery',
  }
);

Gallery.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Gallery, { foreignKey: 'userId' });

export default Gallery; 