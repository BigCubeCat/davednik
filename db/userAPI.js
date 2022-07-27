var { db, userCollection, aql } = require('./db');


async function getAllUsers() {
  const users = [];
  try {
    const userDocs = await db.query(aql`
      FOR u IN ${userCollection}
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

async function createUser(user) {
  try {
    const userDoc = await userCollection.save(user);
    return userDoc._id;
  } catch (err) {
    console.error(err.message);
    return false;
  }
  return true;
}

async function getUser(id) {
  let user;
  try {
    const userDocs = await db.query(aql`
      FOR u IN ${userCollection}
      FILTER u.id == ${id}
      RETURN u
    `);
    for await (const u of userDocs) {
      console.log('u = ', u)
      user = u;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
  return user;
}

async function deleteUser(userKey) {
  try {
    userCollection.remove({ _key: userKey })
  } catch (err) {
    console.error(err.message);
    return false;
  }
  return true;
}

async function updateUser(userKey, user) {
  try {
    userCollection.update(userKey, user)
  } catch (err) {
    console.error(err.message);
    return false;
  }
  return true;
}

async function getUserById(userId) {
  try {
    return userCollection.document({ _id: userId });
  } catch (err) {
    console.error(err)
  }
  return {}
}

module.exports = {
  getAllUsers, createUser, deleteUser, updateUser, getUserById, getUser
}

