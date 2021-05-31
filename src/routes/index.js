var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db;

  

  db.collection('players').find().toArray( function(e, docs){
    // Se listan en el route de userlist
    res.render('index', {
        playersLists : docs,
        titulo: 'hello-docker ;)'
    });
  });


});

module.exports = router;
