const express = require('express');
const drinksController = require('../controllers/Drinks.controller');

const router = express.Router();

router.get('/ingredients/:i', drinksController.ingredients);
router.get('/name/:s', drinksController.getByName);
router.get('/category/list', drinksController.categoryList);
router.get('/category/:c', drinksController.category);
router.get('/:id', drinksController.getById);
router.get('/', drinksController.getAll);
router.get('/letter/:f', drinksController.getByLetter);

module.exports = router;