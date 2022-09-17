const { postReview } = require('../models');
const db = require('../../db');

module.exports = async (req, res) => {
  // Parameters for body of review submission
  const textParam = [
    req.body.product_id,
    req.body.rating,
    new Date().getTime(),
    req.body.summary,
    req.body.body,
    req.body.recommend,
    req.body.name,
    req.body.email,
  ];

  // Photos should already be in array structure
  const photoParam = req.body.photos;

  // Characteristics object should have string id and num value properties
  const charParam = req.body.characteristics;

  // Map characteristics values to column names
  const valToCol = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
  };

  (async () => {
    // Open single connection for transaction
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      // Begin insert of each review section into respective tables
      const postedText = await postReview.text(textParam);
      const newReviewId = postedText.rows[0].review_id;
      const postedPhotos = await postReview.photos(photoParam, newReviewId);

      // Iteratively update each characteristics entry
      for (let key in charParam) {
        await postReview.char(parseInt(key), valToCol[charParam[key]]);
      }

      res.status(200);
      res.send('Successfully posted review!');
      await client.query('COMMIT');
    }
    catch (err) {
      await client.query('ROLLBACK');
      res.status(400);
      res.send(err);
    }
    finally {
      client.release()
    }
  })()
  .catch((err) => console.error(err.stack))
}