const express = require('express');
const mealsController  = require('../controllers/Meals.controller');

const router = express.Router();

router.get('/:id', mealsController.getById);
router.get('/name/:s', mealsController.getByName);
router.get('/', mealsController.getAll);

module.exports = router;