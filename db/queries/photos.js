// For inserting photos into db
const queryPhotos = {};

queryPhotos.insert = `
  INSERT INTO photos
    (review_id, url)
  VALUES
    ($1, $2)
  `;

module.exports = queryPhotos;