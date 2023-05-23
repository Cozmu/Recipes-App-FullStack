'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('drinksIngredients', { 
      idDrink: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'drinks',
          key: 'id_drink',
        },
        field: 'id_drink'
      },
      strIngredient1: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient1',
      },
      strIngredient2: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient2',
      },
      strIngredient3: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient3',
      },
      strIngredient4: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient4',
      },
      strIngredient5: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient5',
      },
      strIngredient6: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient6',
      },
      strIngredient7: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient7',
      },
      strIngredient8: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient8',
      },
      strIngredient9: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient9',
      },
      strIngredient10: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient10',
      },
      strIngredient11: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient11',
      },
      strIngredient12: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient12',
      },
      strIngredient13: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient13',
      },
      strIngredient14: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient14',
      },
      strIngredient15: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_ingredient15',
      },
      strMeasure1: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure1',
      },
      strMeasure2: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure2',
      },
      strMeasure3: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure3',
      },
      strMeasure4: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure4',
      },
      strMeasure5: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure5',
      },
      strMeasure6: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure6',
      },
      strMeasure7: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure7',
      },
      strMeasure8: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure8',
      },
      strMeasure9: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure9',
      },
      strMeasure10: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure10',
      },
      strMeasure11: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure11',
      },
      strMeasure12: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure12',
      },
      strMeasure13: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure13',
      },
      strMeasure14: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure14',
      },
      strMeasure15: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'str_measure15',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('drinksIgredients');
  }
};
