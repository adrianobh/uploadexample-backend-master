
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('cities', {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			defaultValue: Sequelize.UUIDV1,
			primaryKey: true,
		},
		city: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		state: {
			type: Sequelize.STRING,
			allowNull: true,
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

	down: (queryInterface, Sequelize) => queryInterface.dropTable('cities'),
};
