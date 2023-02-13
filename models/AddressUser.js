const User = require("../models/User");

module.exports = (sequelize, DataTypes) => {
  const AddressUser = sequelize.define(
    "AddressUser",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        isUnique: true,
      },
      type_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subdistrict_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      active_address: {
        type: DataTypes.ENUM,
        values: ["active", "not active"],
        defaultValue: "not active",
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
    },
    {
      tableName: "users_address",
      timestamps: true,
    }
  );

  return AddressUser;
};
