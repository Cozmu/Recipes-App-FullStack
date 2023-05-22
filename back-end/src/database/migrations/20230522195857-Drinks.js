'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('drinks', {
      idDrink: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'id_drink',
      },
      strDrink: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_drink',
      },
      strAlcoholic: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_alcoholic',
      },
      strCategory: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_category',
      },
      strArea: {
        allowNull: true, 
        type: Sequelize.STRING,
        field: 'str_area',
      },
      strInstructions: {
        allowNull: false, 
        type: Sequelize.TEXT,
        field: 'str_instructions',
      },
      strDrinkThumb: {
        allowNull: false, 
        type: Sequelize.STRING,
        field: 'str_drink_thumb',
      },
      strTags: {
        allowNull: true, 
        type: Sequelize.STRING,
        field: 'str_tags',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('drinks');
  }
};
