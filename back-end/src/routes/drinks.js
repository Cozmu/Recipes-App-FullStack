const express = require('express');
const { drinksController } = require('../controllers');

const router = express.Router();

router.get('/', drinksController.getById);

module.exports = router; 