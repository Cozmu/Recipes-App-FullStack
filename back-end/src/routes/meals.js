const express = require('express');
const mealsController  = require('../controllers/Meals.controller');

const router = express.Router();

// router.get('/', mealsController.getById);
router.get('/:s', mealsController.getByName);

module.exports = router; 