import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
	static init(sequelize) {
		super.init({
			id: {
				primaryKey: true,
				defaultValue: Sequelize.UUIDV1,
				type: Sequelize.UUID,
			},
            quantidade: Sequelize.DECIMAL,
		},
		{
			sequelize,
			timestamps: true,
		});

		return this;
	}

	static associate(models) {
		this.belongsTo(models.Product, {
			foreignKey: 'user_id',
			as: 'product_id',
		});
	}
}

export default Sale;
