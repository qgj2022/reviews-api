require('dotenv').config();
const { Pool } = require('pg');
const { tables } = require('../db/queries');

// For aws ec2 deployed postgres db
const credentials = {
  user: 'postgres',
  host: 'ec2-54-196-154-163.compute-1.amazonaws.com',
  database: process.env.PG_DB,
  password: 'yota88',
  port: process.env.PG_PORT,
};

const pool = new Pool(credentials);

// Run function below to initialize db table creation if needed
async function connectClient() {
  const client = await pool.connect();
  console.log('Connected to sdc db successfully');
  try {
    const now = await client.query("SELECT NOW()");
    const reviewsTable = await client.query(tables.reviews);
    const photosTable = await client.query(tables.photos);
    const ratingsTable = await client.query(tables.ratingsMeta);
    const charTable = await client.query(tables.charMeta);
    const charName = await client.query(tables.charName);
    console.log('The time is ' + now.rows[0].now);
    console.log('reviews table', reviewsTable);
    console.log('photos table', photosTable);
    console.log('ratings table', ratingsTable);
    console.log('characteristics table', charTable);
    console.log('characteristics name table', charName);
  }
  catch (err) {
    console.log(`Something wrong happened: ${err}`);
  }
  finally {
    client.release();
    console.log('Client disconnected successfully');
  }
};

connectClient();

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
}