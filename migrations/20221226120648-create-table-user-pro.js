"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        isUnique: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmation_code: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      sex: {
        type: Sequelize.ENUM,
        values: ["male", "female"],
        allowNull: true,
      },
      ip_user: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      os: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      browser: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      platform: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      service_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      facebook_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      registration_type: {
        type: Sequelize.ENUM,
        values: ["website", "mobile"],
        allowNull: false,
      },
      last_visited: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      last_visited_from: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email_verified_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
