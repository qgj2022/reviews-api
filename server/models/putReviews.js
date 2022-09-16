const db = require('../../db');
const { queryReviews } = require('../../db/queries');

const putReviews = {};

putReviews.helpful = async (reviewId) => {
  return await db.query(queryReviews.putHelpful(reviewId));
}

putReviews.report = async (reviewId) => {
  return await db.query(queryReviews.putReported(reviewId));
}

// Test case
// putReviews.helpful(1);
// putReviews.report(1);

module.exports = putReviews;