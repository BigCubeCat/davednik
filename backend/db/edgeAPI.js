var { db, edgeCollection, aql } = require('./db');
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
    const docs = await getEdge(_from, _to)
    for (doc of docs) {
      edgeCollection.remove(doc);
    }
  } catch (err) {
    console.error(err.message);
    return false;
  }
  return true;
}

async function getEdge(_from, _to) {
  let edges = [];
  try {
    const edges = await db.query(aql`
      FOR e IN ${edgeCollection}
      FILTER e._from == ${_from} AND e._to == ${_to} OR e._to == ${_from} AND e._from == ${_to}
      RETURN e
    `);
    for await (const e of edges) {
      edges.push(e);
    }
    return edges;
  } catch (err) {
    console.error(err.message);
    return
  }
}

async function getUserEdges(_user) {
  let edgesDoc = [];
  try {
    const edges = await db.query(aql`
      FOR e IN ${edgeCollection}
      FILTER e._from == ${_user} OR e._to == ${_user}
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

async function getEdges(_from) {
  let edgesDoc = [];
  try {
    const edges = await db.query(aql`
      FOR e IN ${edgeCollection}
      FILTER e._from == ${_from} || e._to == ${_from}
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
async function getAllEdges(_from) {
  let edgesDoc = [];
  try {
    const edges = await db.query(aql`
      FOR e IN ${edgeCollection}
      RETURN e
    `);
    for await (const e of edges) {
      edgesDoc.push(e);
    }
    return edgesDoc;
  } catch (err) {
    console.error(err.message);
    return []
  }
}

module.exports = {
  createEdge, deleteEdge, getEdge, getEdges, getAllEdges, getUserEdges
}
