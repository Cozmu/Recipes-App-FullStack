const express = require('express');
const mealsController = require('../controllers/Meals.controller');

const router = express.Router();

router.get('/:id', mealsController.getById);

module.exports = router;