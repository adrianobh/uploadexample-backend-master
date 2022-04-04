module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("request_products", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      request_id: {
        type: Sequelize.UUID,
        references: {
          model: 'requests',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
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
      amout: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      price: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable("request_products"),
};
