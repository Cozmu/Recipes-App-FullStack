'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('meals', 
    { 
      idMeal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id_meal',
      },
      strMeal: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_meal',
      },
      strCategory: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_category',
      },
      strArea: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_area',
      },
      strInstructions: {
        allowNull: false, 
        type: Sequelize.TEXT,
        field: 'str_instructions',
      },
      strMealThumb: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_meal_thumb',
      },
      strTags: {
        allowNull: true, 
        type: Sequelize.STRING,
        field: 'str_tags',
      },
      strYoutube: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_youtube',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('meals');
  }
};
