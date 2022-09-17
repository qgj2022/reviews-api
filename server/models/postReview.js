const db = require('../../db');
const { queryReviews, queryPhotos, queryChar } = require('../../db/queries');

module.exports = {
  text: async (reviewText) => {
    return await db.query(queryReviews.insertText(), reviewText);
  },

  photos: async (reviewPhotos, reviewId) => {
    return await db.query(queryPhotos.insert(reviewPhotos, reviewId));
  },

  char: async (charId, charColumn) => {
    return await db.query(queryChar.insert(charId, charColumn));
  },
}