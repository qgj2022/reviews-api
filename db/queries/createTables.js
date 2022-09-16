// For creating tables if they do not already exist
const tables = {};

tables.reviews =
  `CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL,
    date BIGINT NOT NULL,
    summary TEXT NOT NULL,
    body TEXT NOT NULL,
    recommend BOOLEAN NOT NULL,
    reported BOOLEAN NOT NULL,
    reviewer_name VARCHAR(255) NOT NULL,
    reviewer_email VARCHAR(255) NOT NULL,
    response TEXT,
    helpfulness INT NOT NULL,
    PRIMARY KEY(review_id)
  );`

tables.photos =
  `CREATE TABLE IF NOT EXISTS photos (
    id SERIAL NOT NULL,
    review_id INT REFERENCES reviews(review_id),
    url VARCHAR(255),
    PRIMARY KEY(id)
  );`

tables.ratingsMeta =
  `CREATE TABLE IF NOT EXISTS ratingsmeta (
    product_id INT NOT NULL,
    one_star INT DEFAULT 0,
    two_star INT DEFAULT 0,
    three_star INT DEFAULT 0,
    four_star INT DEFAULT 0,
    five_star INT DEFAULT 0,
    recommend_yes INT DEFAULT 0,
    recommend_no INT DEFAULT 0,
    PRIMARY KEY(product_id)
  );`

tables.charMeta =
  `CREATE TABLE IF NOT EXISTS charmeta (
    char_id INT NOT NULL,
    one INT DEFAULT 0,
    two INT DEFAULT 0,
    three INT DEFAULT 0,
    four INT DEFAULT 0,
    five INT DEFAULT 0,
    product_id INT NOT NULL,
    PRIMARY KEY(char_id)
    );`

tables.charName =
  `CREATE TABLE IF NOT EXISTS charname (
    id SERIAL NOT NULL,
    product_id INT NOT NULL,
    name VARCHAR(10) NOT NULL,
    PRIMARY KEY(id)
    );`

module.exports = tables;