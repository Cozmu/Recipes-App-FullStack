const { Sequelize, sequelize, Model } = require('sequelize');
const { Drinks } = require('../models/index'); 
const { arrDrinks } = require('../utils/formatedDrinks');

async function seedDrinks() {
  try {
    for (const item of arrDrinks) {
      await Drinks.create(item); 
    }
    console.log('Seeds Drinks criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar as seeds:', error);
  } 
}

seedDrinks();