var express = require('express');
var router = express.Router();
let placeModule = require('../lib/place');
router.post('/', async function(req, res, next) {
  console.log("[CALL] - ", req.body.keyword, req.body.type)
  try{
    let result = await placeModule.searchPlaceList(req.body.keyword, req.body.type);
    res.status(200).json(result);
  }catch(e){
    res.status(400).json({
      errorMessage: e
    })
  }
});

module.exports = router;
