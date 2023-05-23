const { Sequelize, sequelize, Model } = require('sequelize');
const { MealsIngredients } = require('../models/index'); 
const { arrMeasuresAndIngredients } = require('../utils/formatedMeals');

async function seedMealsIngredients() {
  try {
    for (const item of arrMeasuresAndIngredients) {
      await MealsIngredients.create(item); 
    }
    console.log('Seeds MealsIngredients criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar as seeds:', error);
  } 
}

seedMealsIngredients();