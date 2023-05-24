const drinkService = require('../services/Drinks.service');

const getByName = async (req, res, next) => {
  try {
    const { s } = req.params;
    const result = await drinkService.getByName(s);
    return res.status(200).json(result);
  } catch (error) {
    next({...error, message: error.message, status: 404});
  }
}

const getAll = async (req, res, next) => {
  try{
    const result = await drinkService.getAll();
    return res.status(200).json(result);
  } catch(error) {
    next({...error, message: error.message, status: 404});
  }
}

const getByLetter = async (req, res, next) => {
  try {
    const { f } = req.params;
    const result = await drinkService.getByLetter(f);
    return res.status(200).json(result);
  } catch (error) {
    next({...error, message: error.message, status: 404});
  }
}

module.exports = {
  getByName,
  getAll,
  getByLetter
}