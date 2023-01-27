module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        isUnique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      confirmation_code: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      sex: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        allowNull: true,
      },
      ip_user: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      os: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      browser: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      facebook_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      registration_type: {
        type: DataTypes.ENUM,
        values: ["website", "mobile"],
        allowNull: false,
      },
      last_visited: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      last_visited_from: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
};
