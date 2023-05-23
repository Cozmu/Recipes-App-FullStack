const { Drinks } =  require('../database/models/index');

const getByName = async (name) => {
  const result = await Drinks.findOne({where: {str_drink: name}});

  if(!result) throw new Error('Drink not found'); 

  return result;
}

const getAll = async () => {
  const result = await Drinks.findAll();

  return result;
}

module.exports = {
  getByName,
  getAll
}