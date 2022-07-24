const { Database, aql } = require("arangojs");

const db = new Database({
  url: "http://davednik.ml:8529",
  databaseName: "main",
  auth: { username: "user", password: "davednik2004" },
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

async function getUserById(userId) {
  try {
    return userCollection.document({ _id: userId });
  } catch (err) {
    console.error(err)
  }
  return {}
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
async function deleteEdge(_from, _to) {
  try {
    // TODO get _key
    const doc = await getEdge(_from, _to)
    console.log("doc = ", doc)
    edgeCollection.remove(doc);
  } catch (err) {
    console.error(err.message);
    return false;
  }
  return true;
}

async function getEdge(_from, _to) {
  let edge;
  try {
    const edges = await db.query(aql`
      FOR e IN ${edgeCollection}
      FILTER e._from == ${_from} && e._to == ${_to}
      RETURN e
    `);
    for await (const e of edges) {
      edge = e;
      break;
    }
    return edge;
  } catch (err) {
    console.error(err.message);
    return
  }
}

async function getEdges(_from) {
  let edgesDoc = [];
  try {
    const edges = await db.query(aql`
      FOR e IN ${edgeCollection}
      FILTER e._from == ${_from}
      RETURN e
    `);
    for await (const e of edges) {
      edgesDoc.push(e);
    }
    return edgesDoc;
  } catch (err) {
    console.error(err.message);
    return
  }
}
module.exports = {
  db, getAllUsers, createUser, deleteUser, updateUser, getUserById,
  createEdge, deleteEdge, getEdge, getEdges, getUser
}
