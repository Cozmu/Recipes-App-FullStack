const { Drinks } =  require('../database/models/index');

const getByName = async (name) => {
  const result = await Drinks.findOne({where: {str_drink: name}});

  if(!result) throw new Error('Drink not found'); 

  return result;
}

module.exports = {
  getByName,
}