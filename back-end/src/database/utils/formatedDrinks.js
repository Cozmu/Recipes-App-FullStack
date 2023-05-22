const { drinks } = require('./drinks.json')

let arrDrinks = [];
let arrMeasuresAndIngredients = [];
const newArr = drinks.map((drink) => {
  delete drink.idDrink;
  delete drink.strVideo;
  delete drink.strGlass;
  delete drink.strIBA;
  delete drink.strDrinkAlternate;
  delete drink.strInstructionsES;
  delete drink.strInstructionsDE;
  delete drink.strInstructionsFR;
  delete drink.strInstructionsIT;
  delete drink['strInstructionsZH-HANS'];
  delete drink['strInstructionsZH-HANT'];
  delete drink.strImageSource;
  delete drink.strImageAttribution;
  delete drink.strCreativeCommonsConfirmed;
  delete drink.dateModified;
  return drink;
});

newArr.forEach((drink, index) => {
  const measuresAndIngredients = {};
  const otherKeys = {};

  for (const key in drink) {
    if (key.includes('strMeasure') || key.includes('strIngredient')) {
      measuresAndIngredients[key] = drink[key];
    } else {
      otherKeys[key] = drink[key];
    }
  }

  arrMeasuresAndIngredients.push({ idDrink: index + 1, ...measuresAndIngredients}); 
  arrDrinks.push({ idDrink: index + 1, ...otherKeys});
});

module.exports = { arrMeasuresAndIngredients, arrDrinks };
