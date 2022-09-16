const db = require('../../db');
const { queryReviews } = require('../../db/queries');

const getReviews = async (productId, sortMethod) => {
  if (sortMethod === 'newest') {
    console.log('hello');
    return await db.query(queryReviews.getNewest(productId));
  }

  if (sortMethod === 'helpful') {
    return await db.query(queryReviews.getHelpful(productId));
    // console.log('results', results.rows);
  }

  if (sortMethod === 'relevant') {
    return await db.query(queryReviews.getRelevant(productId));
    // console.log('results', results.rows);
  }
}

// Test case
// getReviews(50124, 'relevant');

module.exports = getReviews;