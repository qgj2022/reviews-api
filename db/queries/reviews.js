// For inserting and querying reviews from db

module.exports = {
  insert:
    `INSERT INTO reviews
    (product_id, rating, date, summary,
    body, recommend, reported, reviewer_name,
    reviewer_email, response, helpfulness)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `,

  getNewest: (productId, count) => {
    return (
    `SELECT review_id, rating, date, summary, recommend,
    reported, reviewer_name, response, helpfulness
    FROM reviews
    WHERE product_id = ${productId}
    ORDER BY date DESC LIMIT ${count}`
    )
  },

  getHelpful: (productId, count) => {
    return (
      `SELECT review_id, rating, date, summary, recommend,
      reported, reviewer_name, response, helpfulness
      FROM reviews
      WHERE product_id = ${productId}
      ORDER BY helpfulness DESC LIMIT ${count}`
    )
  },

  // Relevance determined by helpfulness value
  // multiplied by 7 days in epoch time
  // and subtracted from overall epoch time
  getRelevant: (productId, count) => {
    return (
      `SELECT review_id, rating, date, summary, recommend,
      reported, reviewer_name, response, helpfulness
      FROM reviews
      WHERE product_id = ${productId}
      ORDER BY date - helpfulness * 604800 DESC LIMIT ${count}`
    )
  },

  putHelpful: (reviewId) => {
    return (
      `UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE review_id = ${reviewId}`
    )
  },

  putReported: (reviewId) => {
    return (
      `UPDATE reviews
      SET reported = true
      WHERE review_id = ${reviewId}`
    )
  },

  insertText: () => {
    return (
      `INSERT INTO reviews
      (product_id, rating, date, summary,
      body, recommend, reviewer_name,
      reviewer_email)
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)`
    )
  }
}

