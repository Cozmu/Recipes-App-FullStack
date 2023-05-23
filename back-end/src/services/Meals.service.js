// const env = process.env.NODE_ENV || 'development';
// const Sequelize = require('sequelize');
const { Meals, MealsIngredients } = require('../database/models/index');
// const config = require('../database/config/config');

// const sequelize = new Sequelize(config[env]);

const getById = async (id) => {
  const result = await Meals.findOne(
    {
      where: { idMeal: id },
      include: [
        { model: MealsIngredients, as: 'mealsToIngredients' },
      ],
    },
  ); 
  if (!result) throw new Error('Non-existent id');
  const resultJs = result.get();
  const {mealsToIngredients} = resultJs;
  delete resultJs.mealsToIngredients;
  const resultWithOutAlias = {
    ...resultJs,
    ...mealsToIngredients.get()
  }
  return { meals: resultWithOutAlias };
};

module.exports = {
  getById,
}