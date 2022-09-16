require('dotenv').config();
const express = require('express');
const controller =  require('../controllers');
const router = express.Router();

router.get('/reviews', controller.getReviews);

router.get('/reviews/meta', controller.getMeta);

router.post('/reviews', );

router.put('/reviews/helpful', controller.putReviews.isHelpful);

router.put('/reviews/report', controller.putReviews.reported);

module.exports = router;