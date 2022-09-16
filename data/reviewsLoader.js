const fs = require('fs');
const { parse } = require('csv-parse');
const { queryPhotos } = require('../db/queries');
const db = require('../db');

const parser = parse(
    {columns: true, relax_quotes: true, cast: true, cast_date: true}
  );

const results = [];

const extractReviews = () => {
  let reviews = fs.createReadStream(__dirname + '/reviews.csv');
  reviews
    .pipe(parser)
    .on('headers', (headers) => {
      console.log('headers', headers[columns]);
    })
    .on('data', (row) => {
      // convert parsed object into array minus first id column
      const values = Object.values(row).slice(1);
      results.push(values);
      console.log(row.id);
    })
    .on('end', async () => {
      // insert row into reviews table
      for (let i = 0; i < results.length; i++) {
        await db.query(queryPhotos.insert, [...results[i]], (err, results) => {
          if (err) {
            console.log('There was an error adding review to database: ', err);
          }
          // include any other success statement here
          console.log('Successfully added review to database!');
        });
      }
      console.log('finished');
    })
  }

  extractReviews();