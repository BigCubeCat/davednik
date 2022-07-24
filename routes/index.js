var express = require('express');
var router = express.Router();
var API = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET search by tag listing. */
router.get('/tag/:tag', async function(req, res) {
  try {
    console.log(req.params.tag)
    const users = await API.searchByTag("#" + req.params.tag);
    res.json({ users: users });
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});


module.exports = router;
