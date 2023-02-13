"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("subdistrict_users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        isUnique: true,
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name_subdistrict: {
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
    await queryInterface.dropTable("subdistrict_users");
  },
};
