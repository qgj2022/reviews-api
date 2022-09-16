// For inserting and querying photos from db

module.exports = {
  insert: (photos, reviewId) => {
    let photosQuery = '';
    for (let i = 0; i < photos.length; i++) {
      photosQuery += `(${reviewId}, '${photos[i]}')`

      if (i < photos.length - 1) {
        photosQuery += ', ';
      }
    }

    return (
      `INSERT INTO photos
      (review_id, url)
      VALUES ` + photosQuery
    )
  }
}