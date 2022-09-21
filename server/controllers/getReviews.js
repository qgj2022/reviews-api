const { getReviews, getPhotos } = require('../models');

module.exports = async (req, res) => {
  if (!req.query.sort || !req.query.product_id) {
    res.sendStatus(404);
    return;
  }

  const { product_id, sort, count } = req.query;
  try {
    const values = await getReviews(product_id, sort, count);

    for (let i = 0; i < values.rows.length; i++) {
      const photos = await getPhotos(values.rows[i].review_id);
      // Convert epoch time to ISO 8601 format
      values.rows[i].date = new Date(parseInt(values.rows[i].date)).toISOString();
      values.rows[i].photos = photos.rows;
    }
    res.status(200);
    res.send(values.rows);
  }
  catch(err) {
    res.status(400);
    res.send(err);
  }
}