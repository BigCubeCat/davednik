var express = require('express');
var router = express.Router();
var searchAPI = require('../db/searchAPI');


/* GET search by tag listing. */
router.get('/tag/:tag', async function(req, res) {
  try {
    const users = await searchAPI.searchByTag("#" + req.params.tag);
    res.json({ users: users });
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* GET search by tag listing. */
router.get('/name/:name', async function(req, res) {
  try {
    const users = await searchAPI.searchUsers(req.params.name);
    res.json({ users: users });
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});


module.exports = router;
