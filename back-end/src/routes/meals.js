const express = require('express');
const { mealsController } = require('../controllers');

const router = express.Router();

router.get('/', mealsController.getById);

module.exports = router; 