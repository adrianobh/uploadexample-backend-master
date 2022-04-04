import Sequelize, { Model } from "sequelize";

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          defaultValue: Sequelize.UUIDV1,
          type: Sequelize.UUID,
        },
        description: Sequelize.STRING,
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.ProductDetail, {
      foreignKey: "product_id",
      as: "product_detail",
    });
    this.hasMany(models.ProductLote, {
      as: 'lotes'
    })
  }
}

export default Product;
