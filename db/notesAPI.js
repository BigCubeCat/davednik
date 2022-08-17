var { db, aql, notesCollection } = require('./db');

async function createNote(relation) {
  console.log('create')
  try {
    return notesCollection.save({ relation: relation, text: "" })
  } catch (err) {
    console.error(err);
  }
  return null;
}

async function getNote(relation) {
  let responseRelation = null;
  try {
    const notesDocs = await db.query(aql`
      FOR note IN ${notesCollection}
      FILTER note.relation == ${relation}
      LIMIT 1
      RETURN note
    `);
    for await (const note of notesDocs) {
      responseRelation = note;
      break;
    }
    if (responseRelation === null) {
      return createNote(relation);
    }
  } catch (err) {
    console.error(err);
  }
  return responseRelation;
}

async function updateNote(relation, text) {
  try {
    const noteDoc = await getNote(relation);
    notesCollection.update(noteDoc._key, { text: text })
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createNote, getNote, updateNote
}
