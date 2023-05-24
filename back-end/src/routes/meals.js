const express = require('express');
const mealsController  = require('../controllers/Meals.controller');

const router = express.Router();

router.get('/category/list', mealsController.categoryList);
router.get('/category/:c', mealsController.category);
router.get('/:id', mealsController.getById);
router.get('/:s', mealsController.getByName);
router.get('/', mealsController.getAll);

module.exports = router;