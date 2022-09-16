// For inserting and querying photos from db

module.exports = {
  insert:
    `INSERT INTO photos
    (review_id, url)
    VALUES ($1, $2)`
}