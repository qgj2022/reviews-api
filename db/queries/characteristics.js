// For inserting and querying characteristics from db

module.exports = {
  insert: (charId, charColumn) => {
    return (
      `UPDATE charmeta
      SET ${charColumn} = ${charColumn} + 1
      WHERE char_id = ${charId}`
    )

  }
}