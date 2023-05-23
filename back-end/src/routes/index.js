const express = require('express');
const errorMiddleware = require('../middleware/ErrorMiddleware');
const mealsRoute = require('./meals')
const drinksRoute = require('./drinks')

const router = express();

router.use('/meals', mealsRoute)
router.use('/drinks', drinksRoute)
router.use(errorMiddleware);

module.exports = router;