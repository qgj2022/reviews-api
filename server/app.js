const express = require('express');
const path = require('path');
const router = require('./routes');
const db = require('../db');

const app = express();

app.use(express.json());
app.use(router);

module.exports = app;