require('dotenv').config();
const app = require('./app.js');
const db = require('../db/pg');
const port = process.env.SV_PORT;

app.listen(port, () => {
  console.log(`Reviews API service is listening on ${port}`);
})