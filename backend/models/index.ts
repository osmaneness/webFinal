import { Sequelize } from 'sequelize';
import config from '../config/config.json';
import User from './User';
import Event from './Event';
import Announcement from './Announcement';
import Gallery from './Gallery';
import Visitor from './Visitor';
import OnlineUser from './OnlineUser';
import Participant from './Participant';

const env = (process.env.NODE_ENV || 'development') as 'development' | 'test' | 'production';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: 'mysql',
    logging: console.log, // SQL sorgularını görmek için
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Veritabanı bağlantısını test et ve tabloları oluştur
sequelize.authenticate()
  .then(() => {
    console.log('Veritabanı bağlantısı başarılı.');
    // Tabloları oluştur (force: true ile mevcut tabloları silip yeniden oluşturur)
    return sequelize.sync({ force: true, alter: true });
  })
  .then(() => {
    console.log('Tablolar başarıyla oluşturuldu.');
  })
  .catch((err) => {
    console.error('Hata:', err);
  });

// İlişkileri tanımla
Event.hasMany(Participant, { foreignKey: 'eventId' });
Participant.belongsTo(Event, { foreignKey: 'eventId' });

export {
  User,
  Event,
  Announcement,
  Gallery,
  Visitor,
  OnlineUser,
  Participant,
  sequelize
}; 