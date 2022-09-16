const db = require('../../db');
const { queryReviews } = require('../../db/queries');

const getReviews = async (productId, sortMethod, count) => {
  if (sortMethod === 'newest') {
    console.log('hello');
    return await db.query(queryReviews.getNewest(productId, count));
  }

  if (sortMethod === 'helpful') {
    return await db.query(queryReviews.getHelpful(productId, count));
  }

  if (sortMethod === 'relevant') {
    return await db.query(queryReviews.getRelevant(productId, count));
  }
}

// Test case
// getReviews(50124, 'relevant');

module.exports = getReviews;