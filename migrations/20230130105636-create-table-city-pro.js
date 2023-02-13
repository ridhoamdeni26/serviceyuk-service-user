"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("city_users", {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        isUnique: true,
      },
      province_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("city_users");
  },
};
