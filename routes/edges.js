var express = require('express');
var router = express.Router();
var edgeAPI = require('../db/edgeAPI');

/* POST edge listing. */
router.post('/', async function(req, res) {
  try {
    const _from = req.body.from;
    const _to = req.body.to;
    if (!_from || !_to) {
      res.status(400);
      return;
    }
    const result = await edgeAPI.createEdge(_from, _to);
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
    const result = await edgeAPI.deleteEdge(_from, _to);
    res.json({ "success": result })
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

/* GET all edge listing. */
router.get('/', async function(req, res) {
  try {
    const result = await edgeAPI.getAllEdges();
    res.json({ "edges": result })
  } catch (err) {
    console.log(err)
    res.status(400)
  }
});

module.exports = router;
