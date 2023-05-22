const { meals } = require('./meals.json');

let arrMeals = [];
let arrMeasuresAndIngredients = [];
const newArr = meals.map((meal) => {
  delete meal.idMeal;
  delete meal.strDrinkAlternate;
  delete meal.strSource;
  delete meal.strImageSource;
  delete meal.strCreativeCommonsConfirmed;
  delete meal.dateModified;
  return meal;
});

newArr.forEach((meal, index) => {
  const measuresAndIngredients = {};
  const otherKeys = {};

  for (const key in meal) {
    if (key.includes('strMeasure') || key.includes('strIngredient')) {
      measuresAndIngredients[key] = meal[key];
    } else {
      otherKeys[key] = meal[key];
    }
  }

  arrMeasuresAndIngredients.push({ idMeal: index + 1, ...measuresAndIngredients}); 
  arrMeals.push({ idMeal: index + 1, ...otherKeys});
});

module.exports = { arrMeasuresAndIngredients, arrMeals };
