import sequelize from '../config/database';
import { User, Event, Announcement, Gallery, Visitor, OnlineUser } from '../models';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Veritabanı bağlantısı başarılı.');

    await sequelize.sync({ alter: true });
    console.log('Veritabanı tabloları senkronize edildi.');

    // Admin kullanıcısı oluştur
    const adminExists = await User.findOne({ where: { email: 'admin@example.com' } });
    if (!adminExists) {
      await User.create({
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin',
        role: 'admin',
      });
      console.log('Admin kullanıcısı oluşturuldu.');
    }

  } catch (error) {
    console.error('Veritabanı bağlantısı başarısız:', error);
  }
};

export default syncDatabase; 