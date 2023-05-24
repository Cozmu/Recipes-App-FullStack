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

const category = async (req, res, next) => {
  try {
    const { c } = req.params;
    const result = await mealService.getByCateg(c);
    return res.status(200).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

const getByName = async (req, res, next) => {
  try {
    const { s } = req.params;
    const result = await mealService.getByName(s);
    return res.status(200).json(result);
  } catch (error) {
    next({...error, message: error.message, status: 404});
  }
}

const getAll = async (req, res, next) => {
  try{
    const result = await mealService.getAll();
    return res.status(200).json(result);
  } catch(error) {
    next({...error, message: error.message, status: 404});
  }
}

module.exports = {
  getByName,
  getAll,
  getById,
  category,
}