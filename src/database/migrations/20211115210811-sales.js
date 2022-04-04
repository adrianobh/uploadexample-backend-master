
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('sales', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true,
		},
    user_id: {
			type: Sequelize.UUID,
			references: {
				model: 'users',
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
			allowNull: false,
		},
    created_at: {
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

	down: (queryInterface, Sequelize) => queryInterface.dropTable('sales'),
};
