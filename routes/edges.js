var express = require('express');
var router = express.Router();
var userAPI = require('../db/db');

/* POST edge listing. */
router.post('/', async function(req, res) {
  try {
    const _from = req.body.from;
    const _to = req.body.to;
    const result = await userAPI.createEdge(_from, _to);
    res.json({ "success": result })
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* DELETE edge listing. */
router.delete('/', async function(req, res) {
  try {
    const _from = req.body.from;
    const _to = req.body.to;
    const result = await userAPI.deleteEdge(_from, _to);
    res.json({ "success": result })
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});



module.exports = router;
