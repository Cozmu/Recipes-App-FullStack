const { Sequelize, sequelize, Model } = require('sequelize');
const { Meals } = require('../models/index'); 
const { arrMeals } = require('../utils/formatedMeals');

async function seedMeals() {
  try {
    for (const item of arrMeals) {
      await Meals.create(item); 
    }
    console.log('Seeds Meals criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar as seeds:', error);
  } 
}

seedMeals();