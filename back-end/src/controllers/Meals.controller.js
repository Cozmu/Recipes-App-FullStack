const mealService = require('../services/Meals.service');

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await mealService.getById(id);
    return res.status(200).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

module.exports = {
  getById,
}