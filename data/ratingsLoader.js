const fs = require('fs');
const db = require('../db');

const valToCol = {
  1: 'one_star',
  2: 'two_star',
  3: 'three_star',
  4: 'four_star',
  5: 'five_star',
}

const loadRatings = async () => {
  let reviews = await db.query(`SELECT * FROM reviews
    ORDER BY product_id;
  `);
  reviews = reviews.rows;

  for (let i = 0; i < reviews.length; i++) {
    const product = reviews[i].product_id;
    const rating = reviews[i].rating;
    const ratingsColumn = valToCol[rating];

    if (reviews[i].recommend) {
      await db.query(`INSERT INTO ratingsmeta
      (product_id, ${ratingsColumn}, recommend_yes)
      VALUES (${product}, 1, 1)
      ON CONFLICT (product_id)
      DO UPDATE SET
      ${ratingsColumn} = ratingsmeta.${ratingsColumn} + 1,
      recommend_yes = ratingsmeta.recommend_yes + 1;
      `);
    } else {
      await db.query(`INSERT INTO ratingsmeta
      (product_id, ${ratingsColumn}, recommend_no)
      VALUES (${product}, 1, 1)
      ON CONFLICT (product_id)
      DO UPDATE SET
      ${ratingsColumn} = ratingsmeta.${ratingsColumn} + 1,
      recommend_no = ratingsmeta.recommend_no + 1;
      `);
    }
  }
}

loadRatings();