const express = require('express');
const drinksController = require('../controllers/Drinks.controller');

const router = express.Router();

router.get('/category/:c', drinksController.category);
router.get('/:id', drinksController.getById);
router.get('/:s', drinksController.getByName);
router.get('/', drinksController.getAll);

module.exports = router;