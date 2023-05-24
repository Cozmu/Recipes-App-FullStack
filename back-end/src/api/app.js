const express = require('express');
// const cors = require('cors');
const router = require('../routes/index');


const app = express();

// app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(router);

module.exports = app;