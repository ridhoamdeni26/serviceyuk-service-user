"use strict";
const bcrypt = require("bcryptjs");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        username: "admin services",
        email: "admin@services.com",
        password: await bcrypt.hash("123456", saltRounds),
        confirmation_code: "",
        images: "images/1671514200683.png",
        phone: "082546271827",
        slug: "admin-services",
        address_id: 1,
        dob: "2022-01-17",
        sex: "male",
        ip_user: "192.168.20.1",
        os: "TESTING",
        browser: "CHROME",
        version: "7.0.0.1",
        platform: "WEBSITE",
        service_id: 1,
        facebook_id: 1,
        registration_type: "website",
        last_visited: "2022-01-17",
        last_visited_from: "2022-01-17",
        status_id: 1,
        email_verified_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
