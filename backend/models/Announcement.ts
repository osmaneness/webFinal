import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Announcement extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public image!: string;
  public status!: 'active' | 'inactive';
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Announcement.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
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
    modelName: 'Announcement',
  }
);

Announcement.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Announcement, { foreignKey: 'userId' });

export default Announcement; 