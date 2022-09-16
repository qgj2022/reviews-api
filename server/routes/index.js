require('dotenv').config();
const express = require('express');
const models =  require('../models');
const router = express.Router();

router.get('/reviews', async (req, res) => {
  if (!req.query.sort || !req.query.product_id) {
    res.sendStatus(404);
    return;
  }
  // const productId  = req.query.product_id;
  // Test
  const { product_id, sort } = req.query;

  try {
    const values = await models.getReviews(product_id, sort);
    // Convert epoch time to ISO 8601 format
    values.rows.forEach((row) => {
      row.date = new Date(parseInt(row.date)).toISOString();
    });
    res.status(200);
    res.send(values);
  }
  catch(err) {
    res.status(400);
    res.send(err);
  }
});

router.get('/reviews/meta', (req, res) => {
  // Insert query here

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