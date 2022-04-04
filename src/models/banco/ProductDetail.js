import Sequelize, { Model } from 'sequelize';

class ProductDetail extends Model {
	static init(sequelize) {
		super.init({
			id: {
				primaryKey: true,
				defaultValue: Sequelize.UUIDV1,
				type: Sequelize.UUID,
			},
			img: Sequelize.STRING,
            detail: Sequelize.STRING,
		},
		{
			sequelize,
			timestamps: true,
		});

		return this;
	}

	static associate(models) {
		this.belongsTo(models.Product, {
			foreignKey: 'product_id',
			as: 'product',
		});
	}
}

export default ProductDetail;
