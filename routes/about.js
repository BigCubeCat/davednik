var express = require('express');
var router = express.Router();
var notesAPI = require('../db/notesAPI');


router.get('/:relation', async function(request, response) {
  try {
    const relation = request.params.relation;
    const result = await notesAPI.getNote(relation);
    response.json({ note: result })
  } catch (err) {
    console.log(err)
    response.status(400)
  }
});


router.put('/:relation', async function(request, response) {
  try {
    const relation = request.params.relation;
    await notesAPI.updateNote(relation, request.body.text);
    return response.json({ status: "ok" })
  } catch (err) {
    console.log(err)
    response.status(400)
  }
});


module.exports = router;
