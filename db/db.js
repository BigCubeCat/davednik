const { Database, aql } = require("arangojs");

const db = new Database({
  url: "http://127.0.0.1:8529",
  databaseName: "main",
  auth: { username: "user", password: "user" },
});
const userCollection = db.collection("users");
const edgeCollection = db.collection("edge");

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
async function searchUser() {
  // TODO
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
    userCollection.save(user)
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
/**
* create edge btw nodes
* from: _id of node
* to: _id of node
*/
async function createEdge(from, to) {
  try {
    edgeCollection.save({ _from: from, _to: to })
  } catch (err) {
    console.error(err.message);
    return false;
  }
  return true;
}
/**
* delete edge btw nodes
* from: _id of node
* to: _id of node
*/
async function deleteEdge(from, to) {
  try {
    // TODO get _key
    edgeCollection.remove({ _from: from, _to: to })
  } catch (err) {
    console.error(err.message);
    return false;
  }
  return true;
}
module.exports = {
  db, getAllUsers, createUser, deleteUser, updateUser,
  createEdge, deleteEdge, getUser
}
