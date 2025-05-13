'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      baslik: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tarih: {
        type: Sequelize.STRING,
        allowNull: false
      },
      saat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      konum: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kapasite: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      katilimciSayisi: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      durum: {
        type: Sequelize.ENUM('Aktif', 'Yakında', 'Tamamlandı'),
        defaultValue: 'Yakında'
      },
      aciklama: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
}; 