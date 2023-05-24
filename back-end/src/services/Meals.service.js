const { Meals, MealsIngredients } = require('../database/models/index');
const Sequelize = require('sequelize');

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
  return { meals: [resultWithOutAlias]};
};

const getByName = async (name) => {
  const results = await Meals.findAll(
    {
      where: {str_meal: {[Op.like]: `%${name}%`}},
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
  getByLetter,
  getByCateg,
  getByCategList,
  getByIngred,
}