const { Database, aql } = require("arangojs");
require('dotenv').config()


const db = new Database({
  url: process.env.DB_URL,
  databaseName: "main",
  auth: { username: "user", password: process.env.PASSWORD },
});
const userCollection = db.collection("users");
const edgeCollection = db.collection("edge");
const notesCollection = db.collection("notes");

module.exports = {
  db, userCollection, edgeCollection, aql, notesCollection
}
