const { Meals } = require('../database/models/index');

const getByName = async (name) => {
  const result = await Meals.findOne({where: {str_meal: name}});

  if(!result) throw new Error('Meal not found'); 

  return result;
}

module.exports = {
  getByName,
}