const express = require('express');
const drinksController = require('../controllers/Drinks.controller');

const router = express.Router();


// router.get('/:id', drinksController.getById);
router.get('/name/:s', drinksController.getByName);
router.get('/', drinksController.getAll);
router.get('/letter/:f', drinksController.getByLetter);

module.exports = router; 