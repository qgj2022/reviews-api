const db = require('../../db');
const { queryReviews } = require('../../db/queries');

const getReviews = async (productId, sort) => {
  if (sort === 'newest') {
    const results = await db.query(queryReviews.getNewest(productId));
  }

  if (sort === 'helpful') {
    const results = await db.query(queryReviews.getHelpful(productId));
    console.log('results', results.rows);
  }

  if (sort === 'relevant') {
    const results = await db.query(queryReviews.getRelevant(productId));
  }
}

getReviews(50124, 'helpful');

module.exports = getReviews;