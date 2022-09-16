const db = require('../../db');
const { queryReviews } = require('../../db/queries');

module.exports = {
  text: async (reviewText) => {
    return await db.query(queryReviews.postText(reviewText));
  },

  photos: async (reviewPhotos) => {
    return await db.query(queryReviews.queryPhotos.insert(reviewPhotos));
  },

  char: async (reviewChar) => {
    return await db.query(queryReviews.queryChar.insert(reviewChar));
  },
}