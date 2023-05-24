const express = require('express');
const mealsController  = require('../controllers/Meals.controller');

const router = express.Router();

router.get('/ingredients/:i', mealsController.ingredients);
router.get('/category/list', mealsController.categoryList);
router.get('/category/:c', mealsController.category);
router.get('/:id', mealsController.getById);
router.get('/name/:s', mealsController.getByName);
router.get('/', mealsController.getAll);
router.get('/letter/:f', mealsController.getByLetter);

module.exports = router;