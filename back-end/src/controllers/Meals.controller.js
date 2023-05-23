const mealService = require('../services/Meals.service');

const getByName = async (req, res, next) => {
  try {
    const { s } = req.params;
    const result = await mealService.getByName(s);
    return res.status(200).json(result);
  } catch (error) {
    next({...error, message: error.message, status: 404});
  }
}

module.exports = {
  getByName,
}