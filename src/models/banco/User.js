import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          defaultValue: Sequelize.UUIDV1,
          type: Sequelize.UUID,
        },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
    });
    this.belongsTo(models.Address, {
      foreignKey: "address_id",
      as: "address",
      allowNull: true,
    });
  }
}

export default User;
