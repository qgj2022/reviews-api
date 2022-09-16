const { putReviews } = require('../models');

module.exports = {
  isHelpful: async (req, res) => {
    if (!req.query.review_id) {
      res.sendStatus(404);
      return;
    }

    const { review_id } = req.query;
    try {
      await putReviews.helpful(review_id);
      res.status(200);
      res.send('Review helpfulness updated!');
    }
    catch(err) {
      res.status(400);
      res.send(err);
    }
  },

  reported: async (req, res) => {
    if (!req.query.review_id) {
      res.sendStatus(404);
      return;
    }

    const { review_id } = req.query;
    try {
      await putReviews.report(review_id);
      res.status(200);
      res.send('Review reported!');
    }
    catch(err) {
      res.status(400);
      res.send(err);
    }
  }
}