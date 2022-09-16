const { getReviewsMeta } = require('../models');

module.exports = async (req, res) => {
  if (!req.query.product_id) {
    res.sendStatus(404);
    return;
  }

  const { product_id } = req.query;
  try {
    const metaInfo = await getReviewsMeta(product_id);
    res.status(200);
    res.send(metaInfo);
  }
  catch(err) {
    res.status(400);
    res.send(err);
  }
}