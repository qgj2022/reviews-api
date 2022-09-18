const db = require('../../db');
const { queryReviews } = require('../../db/queries');

module.exports = async (productId, sortMethod, count) => {
  if (sortMethod === 'newest') {
    return await db.query(queryReviews.getNewest(productId, count));
  }

  if (sortMethod === 'helpful') {
    return await db.query(queryReviews.getHelpful(productId, count));
  }

  if (sortMethod === 'relevant') {
    return await db.query(queryReviews.getRelevant(productId, count));
  }
}