const { Meals, MealsIngredients } = require('../database/models/index');
const Sequelize = require('sequelize');

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
  return [ resultWithOutAlias ];
};

const getByName = async (name) => {
  const result = await Meals.findOne({where: {str_meal: name}});

  if(!result) throw new Error('Meal not found'); 

  return result;
}

const getAll = async () => {
  const result = await Meals.findAll();

  return result;
}

const getByCateg = async (c) => {
  const result = await Meals.findAll(
    {
      where: { strCategory: c },
      include: [
        { model: MealsIngredients, as: 'mealsToIngredients' },
      ],
    },
  );
  if (!result || result.length === 0) throw new Error('Non-existent category');
  const resultJs = result.map((meal) => {
    const newMeal = meal.toJSON();
    const ingr = newMeal.mealsToIngredients;
    delete newMeal.mealsToIngredients;
    return {...newMeal, ...ingr}
  });
  return { meals: resultJs };
};

function ordenarCategorias(array) {
  array.sort((a, b) => {
    if (a.strCategory < b.strCategory) {
      return -1;
    } else if (a.strCategory > b.strCategory) {
      return 1;
    } else {
      return 0;
    }
  });
  return array;
}

const getByCategList = async () => {
  const result = await Meals.findAll(
    { include: [
        { model: MealsIngredients, as: 'mealsToIngredients' },
      ],
    });
  if (!result || result.length === 0) throw new Error('Non-existent category');
    const newMeal = new Set();
    result.forEach((meal) => {
      const catg = meal.toJSON();
      const {strCategory} = catg;
      newMeal.add(strCategory);
    });
    const arrayMeals = Array.from(newMeal);
    const newArrayMeals = arrayMeals.map((category) => ({strCategory: category}))
    const sortedMeals = ordenarCategorias(newArrayMeals)
    return { meals: sortedMeals };
};

const getByIngred = async (i) => {
  const colunasIngredientes = [];
  for (let idx = 1; idx <= 20; idx++) {
    const column = `strIngredient${idx}`;
    colunasIngredientes.push({ [column]: i });
  }

  const result = await MealsIngredients.findAll({
    where: {
      [Sequelize.Op.or]: colunasIngredientes
    },
    include: [
      { model: Meals, as: 'ingredientsTomeals' },
    ],
  });
  if (!result || result.length === 0) throw new Error('Non-existent ingredient');
  const resultJs = result.map((meal) => {
    const newMeal = meal.toJSON();
    const ingr = newMeal.ingredientsTomeals;
    delete newMeal.ingredientsTomeals;
    console.log(ingr);
    return {...ingr, ...newMeal}
  });
  return { meals: resultJs };
};

module.exports = {
  getByName,
  getAll,
  getById,
  getByCateg,
  getByCategList,
  getByIngred,
}