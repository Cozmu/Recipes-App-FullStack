
// const env = process.env.NODE_ENV || 'development';
// const Sequelize = require('sequelize');
const { Meals, MealsIngredients } = require('../database/models/index');
// const config = require('../database/config/config');
const {Op} = require('sequelize');
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
  if (!result || result.length === 0) throw new Error('Non-existent id');
  const resultJs = result.get();
  const {mealsToIngredients} = resultJs;
  delete resultJs.mealsToIngredients;
  const resultWithOutAlias = {
    ...resultJs,
    ...mealsToIngredients.get()
  }
  return { meals: resultWithOutAlias };
};

const getByName = async (name) => {
  const results = await Meals.findAll(
    {
      where: {str_meal: name}, 
      include: [
        { model: MealsIngredients, as: 'mealsToIngredients' },
      ],
    }
    );
  if(!results || results.length === 0) throw new Error('Meal not found'); 

  const meals = results.map((result) => {
    const resultJs = result.toJSON();
    const { mealsToIngredients } = resultJs;
    delete resultJs.mealsToIngredients;

    const resultWithOutAlias = {
      ...resultJs, 
      ...mealsToIngredients
    }
    return resultWithOutAlias;
  });

  return { meals };
}

const getAll = async () => {
  const results = await Meals.findAll(
    {
      include: [
        { model: MealsIngredients, as: 'mealsToIngredients' },
      ],
    }
  );

  const meals = results.map((result) => {
    const resultJs = result.toJSON();
    const { mealsToIngredients } = resultJs;
    delete resultJs.mealsToIngredients;

    const resultWithOutAlias = {
      ...resultJs, 
      ...mealsToIngredients
    }
    return resultWithOutAlias;
  });

  return { meals };
}

const getByLetter = async (letter) => {
  const results = await Meals.findAll(
    {
      where: {
        str_meal: { [Op.like]: `${letter}%` }
      },
      include: [
        { model: MealsIngredients, as: 'mealsToIngredients' },
      ],
    }
  )

  if(!results || result.length === 0) throw new Error('Meal not found'); 

  const meals = results.map((result) => {
    const resultJs = result.toJSON();
    const { mealsToIngredients } = resultJs;
    delete resultJs.mealsToIngredients;

    const resultWithOutAlias = {
      ...resultJs, 
      ...mealsToIngredients
    }
    return resultWithOutAlias;
  });

  return { meals };
}

module.exports = {
  getByName,
  getAll,
  getById,
  getByLetter
}