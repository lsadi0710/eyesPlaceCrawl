var express = require('express');
var router = express.Router();
let placeModule = require('../lib/place');
router.post('/', async function(req, res, next) {
  let result = await placeModule.searchPlaceList(req.body.keyword, req.body.type);
  res.status(200).json(result);
});

module.exports = router;
