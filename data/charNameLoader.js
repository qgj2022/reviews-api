const fs = require('fs');
const { parse } = require('csv-parse');
const db = require('../db');

const parser = parse(
    {columns: true, relax_quotes: true}
  );

const results = [];

const extractCharName = () => {
  let reviews = fs.createReadStream(__dirname + '/characteristics.csv');
  reviews
    .pipe(parser)
    .on('headers', (headers) => {
      console.log('headers', headers[columns]);
    })
    .on('data', (row) => {
      const values = Object.values(row);
      results.push(values);
    })
    .on('end', async () => {
      // insert row into charName table
      for (let i = 0; i < results.length; i++) {
        await db.query(`INSERT INTO charname
          (id, product_id, name)
          VALUES ($1, $2, $3)`, results[i]);
      }
      console.log('finished');
    })
  }

  extractCharName();
