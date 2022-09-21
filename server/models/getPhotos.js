const db = require('../../db');
const { queryPhotos } = require('../../db/queries');

module.exports = async (reviewId) => {
  return await db.query(queryPhotos.get(reviewId));
}