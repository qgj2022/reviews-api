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

module.exports = queryReviews;


