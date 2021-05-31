require('dotenv').config()
const express = require('express')
const fileSystem = require('fs');
var path = require('path');

// Definicion de utilizacion de express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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

var db;


console.log(`NODE_ENV=${process.env.NODE_ENV}`);


// Definicion de las rutas de acceso
var indexRouter = require('./routes/index');

// Permitiendo el acceso a la base de datos mongoDB
app.use(function(req, res, next){
  req.db = db;
  next();
});

// Definicion de rutas de pagina
app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`App escuchando en: http://${HOST}:${PORT}`)
})

module.exports = app;

// Mongodb
const { MongoClient } = require("mongodb");
const { Console } = require('console');

// Connection URL
const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin&useUnifiedTopology=true&useNewUrlParser=true`;
const opts = "";

// Create a new MongoClient
const client = new MongoClient(url);

mongoRun();

async function mongoRun() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Establish and verify connection
    await client.db(`${DB_NAME}`).command({ ping: 1 });

    db = client.db(`${DB_NAME}`);

    console.log("Connected successfully to server");

    inicializacionColeccion(db, DB_COLLECTION, FILE_PLAYERS);

  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.log(`Error de conexion con la db: ${error.message}`); 
    process.exit(1)
  }
}


async function inicializacionColeccion (db, dbCollectionName, fileName) {
  console.log('+Inicialización de db')
  try {
    // Borrado de colección si existe
    console.log('+Borrado de colección:', dbCollectionName);
    db.collection(dbCollectionName).drop(function (err, result) {
      if (err)       
        console.log('-No existe la colección',dbCollectionName)
      if (result)
        console.log('-Se elimino la colección',dbCollectionName);
  });

    // Lectura del archivo json
    console.log('+Leyendo arhivo JSON:', fileName);
    let data = fileSystem.readFileSync(fileName, 'utf8');
    let jsonDataset = JSON.parse(data);

    // Carga de datos a la db
    console.log('+Insertando registros en colección:', dbCollectionName);
    const options = { ordered: true };
    const result = await db.collection(dbCollectionName).insertMany(jsonDataset, options);
    console.log(`${result.insertedCount} registros insertados`);

    console.log('+Inicializacón finalizada OK');
  } catch (err) {
    Console.log(err)
  }
}