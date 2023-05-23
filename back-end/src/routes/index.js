const express = require('express');
const errorMiddleware = require('../middleware/ErrorMiddleware');

const router = express();

router.use(errorMiddleware);

module.exports = router;