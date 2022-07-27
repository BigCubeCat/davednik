var { db, edgeCollection, aql, userCollection } = require('./db');

async function searchByTag(tag) {
  const users = [];
  try {
    const userDocs = await db.query(aql`
      FOR u IN ${userCollection}
      FILTER u.tags =~ ${tag}
      RETURN u
    `);
    for await (const u of userDocs) {
      users.push(u);
    }
  } catch (err) {
    console.error(err.message);
  }
  return users;
}

async function searchUsers(name) {
  const users = [];
  try {
    const userDocs = await db.query(aql`
      FOR u IN ${userCollection}
        FILTER u.name =~ ${name} 
        RETURN u
    `);
    for await (const u of userDocs) {
      users.push(u);
    }
  } catch (err) {
    console.error(err.message);
  }
  return users;
}

module.exports = {
  searchByTag, searchUsers
}
