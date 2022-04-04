module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("addresses", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      city_id: {
        type: Sequelize.UUID,
        references: {
          model: "cities",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      district: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zip_code: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable("addresses"),
};
