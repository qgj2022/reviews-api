const { getReviews } = require('../models');

module.exports = async (req, res) => {
  if (!req.query.sort || !req.query.product_id) {
    res.sendStatus(404);
    return;
  }

  const { product_id, sort, count } = req.query;
  try {
    const values = await getReviews(product_id, sort, count);
    // Convert epoch time to ISO 8601 format
    values.rows.forEach((row) => {
      row.date = new Date(parseInt(row.date)).toISOString();
    });
    res.status(200);
    res.send(values.rows);
  }
  catch(err) {
    res.status(400);
    res.send(err);
  }
}