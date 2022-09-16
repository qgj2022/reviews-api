const fs = require('fs');
const { parse } = require('csv-parse');
const { queryPhotos } = require('../db/queries');
const db = require('../db');

const parser = parse(
    {columns: true, relax_quotes: true}
  );

const results = [];

const extractPhotos = () => {
  let reviews = fs.createReadStream(__dirname + '/reviews_photos.csv');
  reviews
    .pipe(parser)
    .on('headers', (headers) => {
      console.log('headers', headers[columns]);
    })
    .on('data', (row) => {
      // convert parsed object into array minus first id column
      const values = Object.values(row).slice(1);
      results.push(values);
    })
    .on('end', async () => {
      // insert row into reviews table
      for (let i = 0; i < results.length; i++) {
        await db.query(queryPhotos.insert, [...results[i]]);
      }
      console.log('finished');
    })
  }

  extractPhotos();