
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('roles', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true,
		},
		permission: {
			type: Sequelize.STRING,
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

	down: (queryInterface, Sequelize) => queryInterface.dropTable('roles'),
};
