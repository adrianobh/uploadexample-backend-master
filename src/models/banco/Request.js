import Sequelize, { Model } from "sequelize";

class Request extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          defaultValue: Sequelize.UUIDV1,
          type: Sequelize.UUID,
        },
        total_price: Sequelize.DECIMAL,
        data_sale: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user',
		});
    this.belongsTo(models.User, {
			foreignKey: 'facilitador_id',
			as: 'facilitador',
		});
    this.hasMany(models.RequestProduct, {
			as: 'request_product',
		});
  }
}

export default Request;
