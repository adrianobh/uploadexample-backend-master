import Sequelize, { Model } from "sequelize";

class RequestProduct extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          defaultValue: Sequelize.UUIDV1,
          type: Sequelize.UUID,
        },
        amout: Sequelize.STRING,
        price: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
		this.belongsTo(models.Product, {
			foreignKey: 'product_id',
			as: 'product',
		});
    this.belongsTo(models.Request, {
        foreignKey: "request_id",
        as: "request",
      });
  }
}

export default RequestProduct;
