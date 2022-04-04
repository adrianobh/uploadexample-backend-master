import Sequelize, { Model } from 'sequelize';

class Role extends Model {
	static init(sequelize) {
		super.init({
			id: {
				primaryKey: true,
				defaultValue: Sequelize.UUIDV1,
				type: Sequelize.UUID,
			},
			permission: Sequelize.STRING,
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

export default Role;
