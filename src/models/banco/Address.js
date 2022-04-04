import Sequelize, { Model } from 'sequelize';

class Address extends Model {
	static init(sequelize) {
		super.init({
			id: {
				primaryKey: true,
				defaultValue: Sequelize.UUIDV1,
				type: Sequelize.UUID,
			},
			street: Sequelize.STRING,
			district: Sequelize.STRING,
            complement: Sequelize.STRING,
            zip_code: Sequelize.STRING,
		},
		{
			sequelize,
			timestamps: true,
		});

		return this;
	}

	static associate(models) {
		this.belongsTo(models.City, {
			foreignKey: 'city_id',
			as: 'city',
		});
	}
}

export default Address;
