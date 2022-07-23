var express = require('express');
var router = express.Router();
var userAPI = require('../db/db');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const users = await userAPI.getAllUsers();
    res.json({ users: users });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});


module.exports = router;
