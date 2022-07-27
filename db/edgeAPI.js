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
  createEdge, deleteEdge, getEdge, getEdges, getAllEdges
}
