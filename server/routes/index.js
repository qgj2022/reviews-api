require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get('/reviews');

router.get('/reviews/meta');

router.post('/reviews');

// Mark review as helpful
// Expects 'reviewId' in body
router.put('/reviews/helpful');

// Reports review
// Expects 'reviewId' in body
router.put('/reviews/report');

module.exports = router;