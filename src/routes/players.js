var express = require('express');
var router = express.Router();

/* Post players */
router.post('/players', function(req, res) {
  var valor = req.body.valor
  var campo = req.body.campo
  var db = req.db;
  var query = {};

  if (campo == "0"){
    query = {};
  } else{
    filter = { '$regex': valor, $options: 'is' }
    query[campo] =  filter
  }
  
  var date = new Date().toISOString()
  console.log(date, " Se realizo la busqueda: ", query)

  db.collection('players').find(query).toArray( function(e, docs){
    // Se listan en el route de players
    res.render('players', {
        playersLists : docs,
        titulo: 'hello-docker ;)'
    });
  });
});

module.exports = router;