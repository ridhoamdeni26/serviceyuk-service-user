const { Province } = require("./Province");
const { City } = require("./City");
module.exports = (sequelize, DataTypes) => {
  const Subdistrict = sequelize.define(
    "Subdistrict",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        isUnique: true,
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
      name_subdistrict: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "subdistrict_users",
      timestamps: true,
    }
  );

  return Subdistrict;
};
