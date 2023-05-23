const { Sequelize, sequelize, Model } = require('sequelize');
const { DrinksIngredients } = require('../models/index'); 
const { arrMeasuresAndIngredients } = require('../utils/formatedDrinks');

async function seedDrinksIngredients() {
  try {
    for (const item of arrMeasuresAndIngredients) {
      await DrinksIngredients.create(item); 
    }
    console.log('Seeds DrinksIngredients criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar as seeds:', error);
  } 
}

seedDrinksIngredients();