var express = require('express');
var router = express.Router();
var userAPI = require('../db/userAPI');
var edgesAPI = require('../db/edgeAPI');

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

/* PUT user listing */
router.put('/:id', async function(req, res) {
  try {
    const user = await userAPI.getUser(req.params.id);
    console.log("user = ", user)
    const users = await userAPI.updateUser(user._key, req.body);
    res.json({ success: users });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* DELETE user listing */
router.delete('/:id', async function(req, res) {
  try {
    const user = await userAPI.getUser(req.params.id);
    const users = await userAPI.deleteUser(user._key);
    res.json({ success: users });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* DELETE all users */
router.delete('/', async function(req, res) {
  try {
    const result = await userAPI.deleteAllUsers();
    res.json({ success: result });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* GET user listing */
router.get('/:id', async function(req, res) {
  try {
    const user = await userAPI.getUser(req.params.id);
    res.json({ user: user });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* GET user listing */
router.get('/tg/:id', async function(req, res) {
  try {
    const user = await userAPI.getUserByTgId(parseInt(req.params.id));
    res.json({ user: user });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* POST user listing */
router.post('/:id', async function(req, res) {
  try {
    const userData = req.body.user;
    if (userData === undefined) {
      res.status(400);
      return;
    }
    userData.id = req.params.id;
    const user = await userAPI.createUser(userData);
    if (user === undefined) {
      res.status(400);
      return;
    }
    res.json({ success: user });

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* GET user neighbors listing */
router.get('/neighbors/:id', async function(req, res) {
  try {
    const user = await userAPI.getUser(req.params.id);
    if (user === undefined) {
      res.status(400);
      return;
    }
    const edges = await edgesAPI.getEdges(user._id);
    if (edges) {
      let users = [];
      for (const i in edges) {
        const u = await userAPI.getUserById(edges[i]._to)
        users.push(u);
      }
      res.json({ users: users });
      return
    }
    res.status(404)
    return;

  } catch (err) {
    console.log(err)
    res.status(400)
  }
});


module.exports = router;
