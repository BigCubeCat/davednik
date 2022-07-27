var express = require('express');
var router = express.Router();
var API = require('../db/db');


/* GET search by tag listing. */
router.get('/tag/:tag', async function(req, res) {
  try {
    const users = await API.searchByTag("#" + req.params.tag);
    res.json({ users: users });
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* GET search by tag listing. */
router.get('/name/:name', async function(req, res) {
  try {
    console.log(req.params.name)
    const users = await API.searchUsers(req.params.name);
    res.json({ users: users });
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});


module.exports = router;

