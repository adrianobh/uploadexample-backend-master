module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("product_details", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      detail: {
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

  down: (queryInterface, Sequelize) =>
    queryInterface.dropTable("product_details"),
};
