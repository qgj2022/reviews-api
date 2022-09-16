// For inserting reviews into db
const queryReviews = {};

queryReviews.insert = `
  INSERT INTO reviews
  (product_id, rating, date, summary,
  body, recommend, reported, reviewer_name,
  reviewer_email, response, helpfulness)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  `;

queryReviews.getNewest = (productId) => {
  return (
  `SELECT review_id, rating, date, summary, recommend,
  reported, reviewer_name, response, helpfulness
  FROM reviews
  WHERE product_id = ${productId}
  ORDER BY date DESC`
  )
}

queryReviews.getHelpful = (productId) => {
  return (
    `SELECT review_id, rating, date, summary, recommend,
    reported, reviewer_name, response, helpfulness
    FROM reviews
    WHERE product_id = ${productId}
    ORDER BY helpfulness DESC`
  )
}

// Relevance determined by helpfulness value
// multiplied by 7 days in epoch time
// and subtracted from overall epoch time
queryReviews.getRelevant = (productId) => {
  return (
    `SELECT review_id, rating, date, summary, recommend,
    reported, reviewer_name, response, helpfulness
    FROM reviews
    WHERE product_id = ${productId}
    ORDER BY date - helpfulness * 604800 DESC`
  )
}

queryReviews.putHelpful = (reviewId) => {
  return (
    `UPDATE reviews
    SET helpfulness = helpfulness + 1
    WHERE review_id = ${reviewId}`
  )
}

queryReviews.putReported = (reviewId) => {
  return (
    `UPDATE reviews
    SET reported = true
    WHERE review_id = ${reviewId}`
  )
}

module.exports = queryReviews;


