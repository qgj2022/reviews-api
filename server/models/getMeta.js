const db = require('../../db');

const getReviewsMeta = async (productId) => {
  const data = {};
  // No need for opening single client connection here. Read only
  const ratings = await db.query(`SELECT * FROM ratingsmeta
    WHERE product_id = ${productId};
  `);

  const charValues = await db.query(`SELECT
    char_id, one, two, three, four, five
    FROM charmeta
    WHERE product_id = ${productId};
  `);

  const charTitle = await db.query(`SELECT name FROM charname
  WHERE product_id = ${productId};
`);

  const avgCharValues = charValues.rows.map((char) => {
    const transformedCharObj = {};
    let sum = 0;
    let count = 0;
    let avg = 0;
    const charValArr = Object.values(char).slice(1);
    for (let i = 0; i < charValArr.length; i++) {
      sum += (i + 1) * charValArr[i];
      count += charValArr[i];
    }
    avg = sum / count;

    transformedCharObj.id = char.char_id;
    transformedCharObj.value = avg.toString();
    return transformedCharObj;
  })

  data.product_id = productId;
  data.ratings = {
    '1': ratings.rows[0].one_star,
    '2': ratings.rows[0].two_star,
    '3': ratings.rows[0].three_star,
    '4': ratings.rows[0].four_star,
    '5': ratings.rows[0].five_star,
  };
  // Original API provides values as strings
  data.recommended = {
    'false': ratings.rows[0].recommend_yes.toString(),
    'true': ratings.rows[0].recommend_no.toString(),
  }

  data.characteristics = {};
  // Add each characteristic object containing id and value
  // as object property of data.characteristics
  for (let i = 0; i < charTitle.rows.length; i++) {
    data.characteristics[charTitle.rows[i].name] = avgCharValues[i];
  }

  console.log(data);
  // console.log('charTitle', charTitle);
  // console.log('ratings meta', ratings);
  // console.log('chars meta', charValues);
}

getReviewsMeta(1002);

module.exports = getReviewsMeta;