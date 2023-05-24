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

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await drinkService.getById(id);
    return res.status(200).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

const category = async (req, res, next) => {
  try {
    const { c } = req.params;
    const result = await drinkService.getByCateg(c === 'Coffee_Tea' ? 'Coffee / Tea' : c);
    return res.status(200).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

const categoryList = async (req, res, next) => {
  try {
    const result = await drinkService.getByCategList();
    return res.status(200).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

const ingredients = async (req, res, next) => {
  try {
    const { i } = req.params;
    const result = await drinkService.getByIngred(i);
    return res.status(200).json(result);
  } catch (error) {
    next({ ...error, message: error.message, status: 404 });
  }
};

module.exports = {
  getByName,
  getAll,
  getByLetter,
  getById,
  category,
  categoryList,
  ingredients,
}