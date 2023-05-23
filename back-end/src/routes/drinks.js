const express = require('express');
const drinksController = require('../controllers/Drinks.controller');

const router = express.Router();

// router.get('/', drinksController.getById);
router.get('/:s', drinksController.getByName);

module.exports = router; 