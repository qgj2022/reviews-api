require('dotenv').config();
const express = require('express');
// const models =  require('./models');
const router = express.Router();

router.get('/reviews', (req, res) => {
  // Insert query here
  if (!req.query.sort || !req.query.productId) {
    res.sendStatus(404);
    return;
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