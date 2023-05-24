const { Drinks, DrinksIngredients } =  require('../database/models/index');

const getByName = async (name) => {
  const result = await Drinks.findOne(
    {
      where: {str_drink: name},
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    }
  );

  if(!result) throw new Error('Drink not found'); 
  const resultJs = result.get();
  const { drinksToIngredients } = resultJs;
  delete resultJs.drinksToIngredients;
  const resultWithOutAlias = {
    ...resultJs,
    ...drinksToIngredients.get()
  }
  return {drinks: resultWithOutAlias};
}

const getAll = async () => {
  const result = await Drinks.findAll(
    {
      include: [
        { model: DrinksIngredients, as: 'drinksToIngredients' },
      ],
    });

  const resultJs = result.get();
  const { drinksToIngredients } = resultJs;
  delete resultJs.drinksToIngredients;
  const resultWithOutAlias = {
    ...resultJs,
    ...drinksToIngredients.get()
  }
  return {drinks: resultWithOutAlias};
}

module.exports = {
  getByName,
  getAll
}