require('dotenv').config();
const express = require('express');
const router = express.Router();
const controller =  require('../controllers');

router.get('/reviews', controller.getReviews);

router.get('/reviews/meta', controller.getMeta);

router.post('/reviews', controller.postReview);

router.put('/reviews/helpful', controller.putReviews.isHelpful);

router.put('/reviews/report', controller.putReviews.reported);

module.exports = router;