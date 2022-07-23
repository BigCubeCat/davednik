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

/* UPDATE user listing */
router.put('/:id', async function(req, res) {
  try {
    const user = await userAPI.getUser(req.params.id);
    if (user === undefined) {
      res.status(400);
      return;
    }
    const users = await userAPI.updateUser(user._key, req.body);
    res.json({ success: users });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});


module.exports = router;
