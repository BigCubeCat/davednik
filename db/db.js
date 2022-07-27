const { Database, aql } = require("arangojs");

const db = new Database({
  url: "http://davednik.ml:8529",
  databaseName: "main",
  auth: { username: "user", password: "davednik2004" },
});
const userCollection = db.collection("users");
const edgeCollection = db.collection("edge");


module.exports = {
  db, userCollection, edgeCollection, aql
}
