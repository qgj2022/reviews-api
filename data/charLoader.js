const fs = require('fs');
const { parse } = require('csv-parse');
const db = require('../db');

const parser = parse(
    {columns: true, relax_quotes: true}
  );

const results = [];

const valToCol = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
}

const extractChar = () => {
  let reviews = fs.createReadStream(__dirname + '/characteristic_reviews.csv');
  reviews
    .pipe(parser)
    .on('headers', (headers) => {
      console.log('headers', headers[columns]);
    })
    .on('data', (row) => {
      let value = parseInt(row.value);
      results.push([row.characteristic_id, row.review_id, value]);
      // console.log(row.id);
    })
    .on('end', async () => {
      // insert row into charmeta table
      for (let i = 0; i < results.length; i++) {
        const val = results[i][2];
        const charColumn = valToCol[val];

        await db.query(`INSERT INTO charmeta
          (char_id, ${charColumn}, product_id)
          SELECT ${results[i][0]}, 1, product_id
          FROM reviews
          WHERE reviews.review_id = ${results[i][1]}
          ON CONFLICT (char_id)
          DO UPDATE SET ${charColumn} = charmeta.${charColumn} + 1;
          `);
      }
      console.log('finished');
    })
  }

  extractChar();
