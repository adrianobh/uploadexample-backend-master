import Sequelize, { Model } from 'sequelize';

class ProducerLote extends Model {
	static init(sequelize) {
		super.init({
			id: {
				primaryKey: true,
				defaultValue: Sequelize.UUIDV1,
				type: Sequelize.UUID,
			},
			valor: Sequelize.DECIMAL,
			lote: Sequelize.STRING,
			quantidade: Sequelize.DECIMAL,
            unidade: Sequelize.STRING,
            status: Sequelize.BOOLEAN,
            data_entrada: Sequelize.DATE,
            data_validade: Sequelize.DATE,
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
        this.belongsTo(models.Product, {
			foreignKey: 'product_id',
			as: 'product',
		});
	}
}

export default ProducerLote;
