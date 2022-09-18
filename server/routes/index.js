require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const controller =  require('../controllers');

router.get('/reviews', controller.getReviews);

router.get('/reviews/meta', controller.getMeta);

router.post('/reviews/post', controller.postReview);

router.put('/reviews/helpful', controller.putReviews.isHelpful);

router.put('/reviews/report', controller.putReviews.reported);


router.get(`/loaderio-0b604fbc66becdb13d5041882e334777.txt`, (req, res) => {
    res.sendFile(path.join(__dirname + `../../../testing/loaderio-0b604fbc66becdb13d5041882e334777.txt`))
});

module.exports = router;