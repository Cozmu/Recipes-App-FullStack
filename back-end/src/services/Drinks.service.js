const { Drinks, DrinksIngredients } =  require('../database/models/index');

const getByName = async (name) => {
  const results = await Drinks.findAll(
    {
      where: {str_drink: name},
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    }
  );

  if(!results) throw new Error('Drink not found'); 

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

getByLetter = async (letter) => {
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

  if(!results) throw new Error('Drink not found'); 

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

module.exports = {
  getByName,
  getAll,
  getByLetter
}