// For inserting and querying characteristics from db

module.exports = {
  insert: (charObj, value) => {
    const valToCol = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
    };

    const charIds = Object.keys(charObj);
    const charVals = Object.values(charObj);
    let charQuery = '';

    for (let i = 0; i < charIds.length; i++) {
      charQuery += `${valToCol[charVals[i]]} = ${valToCol[charVals[i]]} + 1
        WHERE ${chardIds[i]} = char_id`;

      if (i < charIds.length - 1) {
        charquery += ', ';
      }
    }

    console.log(charQuery);
    return (
      `UPDATE charmeta
      (one, two, three, four, five)
      SET` + charQuery
    )
  }
}