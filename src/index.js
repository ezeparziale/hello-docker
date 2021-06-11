require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser");
const fileSystem = require('fs');
var path = require('path');

// Definicion de utilizacion de express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));

//Variables
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const FILE_PLAYERS = './data/players.json';

var date = new Date().toISOString()
var db;

console.log(date, `NODE_ENV=${process.env.NODE_ENV}`);

// Definicion de las rutas de acceso
var indexRouter = require('./routes/index');
var playersRouter = require('./routes/players');

// Permitiendo el acceso a la base de datos mongoDB
app.use(function(req, res, next){
  req.db = db;
  next();
});

// Definicion de rutas de pagina
app.use('/', indexRouter);
app.post('/players', playersRouter);

app.listen(PORT, () => {
  console.log(date, `App escuchando en: http://${HOST}:${PORT}`)
})

module.exports = app;

// Mongodb
const { MongoClient } = require("mongodb");
const { Console } = require('console');

// URL para conexion
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin&useUnifiedTopology=true&useNewUrlParser=true`;
const opts = "";

// Creacion del cliente mongodb
const client = new MongoClient(url);

mongoRun();

// Funcion para conectarse a la bd
async function mongoRun() {
  try {
    // Coneccion al servidor db
    await client.connect();
    
    // Estableciendo la conexion y verificando
    await client.db(`${DB_NAME}`).command({ ping: 1 });
    db = client.db(`${DB_NAME}`);

    console.log(date, "Connected successfully to server");

    inicializacionColeccion(db, DB_COLLECTION, FILE_PLAYERS);

  } catch (error) {
    console.log(date, `Error de conexion con la db: ${error.message}`); 
    process.exit(1)
  }
}

// Funcion para inicializar la colleccion players
async function inicializacionColeccion (db, dbCollectionName, fileName) {
  console.log(date, '+Inicialización de db')
  try {
    // Borrado de colección si existe
    console.log(date, '+Borrado de colección:', dbCollectionName);
    db.collection(dbCollectionName).drop(function (err, result) {
      if (err)       
        console.log(date, '-No existe la colección',dbCollectionName)
      if (result)
        console.log(date, '-Se elimino la colección',dbCollectionName);
  });

    // Lectura del archivo json
    console.log(date, '+Leyendo arhivo JSON:', fileName);
    let data = fileSystem.readFileSync(fileName, 'utf8');
    let jsonDataset = JSON.parse(data);

    // Carga de datos a la db
    console.log(date, '+Insertando registros en colección:', dbCollectionName);
    const options = { ordered: true };
    const result = await db.collection(dbCollectionName).insertMany(jsonDataset, options);
    console.log(date, `${result.insertedCount} registros insertados`);

    console.log(date, '+Inicializacón finalizada OK');
  } catch (err) {
    Console.log(date, err)
  }
}