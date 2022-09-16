const { postReview } = require('../models');

module.exports = async (req, res) => {
  // Parameters for body of review submission
  const textParam = [
    req.body.product_id,
    req.body.rating,
    new Date().getTime(),
    req.body.summary,
    req.body.body,
    req.body.recommend,
    req.body.name,
    req.body.email,
  ];

  console.log(textParam);
  // Photos should already be in array structure
  const photoParam = req.body.photos;

  // Characteristics object should have string id and num value properties
  const charParam = req.body.characteristics;

  try {
    const postedText = await postReview.text(textParam);
    // const postedPhotos = await postReview.photos(photoParam, postedText.rows[0]);
    // const postedChars = await postReview.char(charParam);
    res.status(200);
    // res.send(postedText.rows);
    res.send(postedText);
  }
  catch(err) {
    res.status(400);
    res.send(err);
  }
}


// app.post('/review/post', (req, res) => {
//   axios.post(`${process.env.API}/reviews`, {
//     product_id: req.body.product_id,
//     rating: req.body.rating,
//     summary: req.body.summary,
//     body: req.body.body,
//     recommend: req.body.recommend,
//     name: req.body.name,
//     email: req.body.email,
//     photos: req.body.photos,
//     characteristics: req.body.characteristics
//   }, {