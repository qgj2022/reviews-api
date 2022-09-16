const db = require('../../db');
const { queryReviews } = require('../../db/queries');

module.exports = {
  helpful: async (reviewId) => {
    return await db.query(queryReviews.putHelpful(reviewId));
  },

  report: async (reviewId) => {
    return await db.query(queryReviews.putReported(reviewId));
  }
}