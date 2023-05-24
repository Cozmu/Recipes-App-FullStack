const { Drinks, DrinksIngredients } =  require('../database/models/index');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const getById = async (id) => {
  const result = await Drinks.findOne(
    {
      where: { idDrink: id },
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    },
  );
  if (!result) throw new Error('Non-existent id');
  const resultJs = result.get();
  const {drinksToIngredients} = resultJs;
  delete resultJs.drinksToIngredients;
  const resultWithOutAlias = {
    ...resultJs,
    ...drinksToIngredients.get()
  }
  return { drinks: [resultWithOutAlias]};
};

const getByName = async (name) => {
  const results = await Drinks.findAll(
    {
      where: {str_drink: {[Op.like]: `%${name}%`}},
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    }
  );

  if(!results || results.length === 0) throw new Error('Drink not found'); 

  const drinks = results.map((result) => {
    const resultJs = result.toJSON();
    const { drinksToIngredients } = resultJs;
    delete resultJs.drinksToIngredients;

    const resultWithOutAlias = {
      ...resultJs, 
      ...drinksToIngredients
    }
    return resultWithOutAlias;
  });

  return { drinks };
}

const getAll = async () => {
  const results = await Drinks.findAll(
    {
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    });

  const drinks = results.map((result) => {
    const resultJs = result.toJSON();
    const { drinksToIngredients } = resultJs;
    delete resultJs.drinksToIngredients;
  
    const resultWithOutAlias = {
      ...resultJs, 
      ...drinksToIngredients
    }
    return resultWithOutAlias;
  });
  
    return { drinks };
}

const getByLetter = async (letter) => {
  const results = await Drinks.findAll(
    {
      where: {
        str_drink: {[Op.like]: `${letter}%`}
      },
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    }
  )

  if(!results || results.length === 0) throw new Error('Drink not found'); 

  const drinks = results.map((result) => {
    const resultJs = result.toJSON();
    const { drinksToIngredients } = resultJs;
    delete resultJs.drinksToIngredients;

    const resultWithOutAlias = {
      ...resultJs, 
      ...drinksToIngredients
    }
    return resultWithOutAlias;
  });

  return { drinks };
}

const getByCateg = async (c) => {
  const result = await Drinks.findAll(
    {
      where: { strCategory: c },
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    },
  );
  if (!result || result.length === 0) throw new Error('Non-existent category');
  const resultJs = result.map((drink) => {
    const newDrink = drink.toJSON();
    const ingr = newDrink.drinksToIngredients;
    delete newDrink.drinksToIngredients;
    return {...newDrink, ...ingr}
  });
  return { drinks: resultJs };
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
  const result = await Drinks.findAll(
    { include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    });
  if (!result || result.length === 0) throw new Error('Non-existent category');
    const newDrik = new Set();
    result.forEach((drink) => {
      const catg = drink.toJSON();
      const {strCategory} = catg;
      newDrik.add(strCategory);
    });
    const arrayDrinks = Array.from(newDrik);
    const newArrayDrinks = arrayDrinks.map((category) => ({strCategory: category}))
    const sortedDrinks = ordenarCategorias(newArrayDrinks)
    return { drinks: sortedDrinks };
};

const getByIngred = async (i) => {
  const colunasIngredientes = [];
  for (let idx = 1; idx <= 15; idx++) {
    const column = `strIngredient${idx}`;
    colunasIngredientes.push({ [column]: i });
  }

  const result = await DrinksIngredients.findAll({
    where: {
      [Sequelize.Op.or]: colunasIngredientes
    },
    include: [
      { model: Drinks, as: 'ingredientsToDrinks' },
    ],
  });
  if (!result || result.length === 0) throw new Error('Non-existent ingredient');
  const resultJs = result.map((drink) => {
    const newDrink = drink.toJSON();
    const ingr = newDrink.ingredientsToDrinks;
    delete newDrink.ingredientsToDrinks;
    console.log(ingr);
    return {...ingr, ...newDrink}
  });
  return { drinks: resultJs };
};

module.exports = {
  getByName,
  getAll,
  getByLetter,
  getById,
  getByCateg,
  getByCategList,
  getByIngred,
}