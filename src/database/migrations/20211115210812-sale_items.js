
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('sale_items', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true,
		},
    product_id: {
			type: Sequelize.UUID,
			references: {
				model: 'products',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
			allowNull: false,
		},
    quantidade: {
			type: Sequelize.DECIMAL(10, 2),
			allowNull: false,
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},

	}),

	down: (queryInterface, Sequelize) => queryInterface.dropTable('sale_items'),
};
