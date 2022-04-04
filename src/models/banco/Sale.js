import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
	static init(sequelize) {
		super.init({
			id: {
				primaryKey: true,
				defaultValue: Sequelize.UUIDV1,
				type: Sequelize.UUID,
			},
            
		},
		{
			sequelize,
			timestamps: true,
		});

		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user',
		});
	}
}

export default Sale;
