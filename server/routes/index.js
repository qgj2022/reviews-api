require('dotenv').config();
const express = require('express');
const models =  require('../models');
const router = express.Router();

router.get('/reviews', async (req, res) => {
  if (!req.query.sort || !req.query.product_id) {
    res.sendStatus(404);
    return;
  }

  const { product_id, sort, count } = req.query;
  try {
    const values = await models.getReviews(product_id, sort, count);
    // Convert epoch time to ISO 8601 format
    values.rows.forEach((row) => {
      row.date = new Date(parseInt(row.date)).toISOString();
    });
    res.status(200);
    res.send(values.rows);
  }
  catch(err) {
    res.status(400);
    res.send(err);
  }
});

router.get('/reviews/meta', async (req, res) => {
  if (!req.query.product_id) {
    res.sendStatus(404);
    return;
  }

  const { product_id } = req.query;

  try {
    const metaInfo = await models.getReviewsMeta(product_id);
    res.status(200);
    res.send(metaInfo);
  }
  catch(err) {
    res.status(400);
    res.send(err);
  }
});

router.post('/reviews', (req, res) => {
  // Insert query here


});

// Mark review as helpful
// Expects 'reviewId' in body
router.put('/reviews/helpful', (req, res) => {
  // Insert query here

});

// Reports review
// Expects 'reviewId' in body
router.put('/reviews/report', (req, res) => {
  // Insert query here

});

module.exports = router;