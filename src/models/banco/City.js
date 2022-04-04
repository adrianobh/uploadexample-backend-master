import Sequelize, { Model } from 'sequelize';

class City extends Model {
	static init(sequelize) {
		super.init({
			id: {
				primaryKey: true,
				defaultValue: Sequelize.UUIDV1,
				type: Sequelize.UUID,
			},
			city: Sequelize.STRING,
			state: Sequelize.STRING,
		},
		{
			sequelize,
			timestamps: true,
		});

		return this;
	}

	static associate(models) {

	}
}

export default City;
