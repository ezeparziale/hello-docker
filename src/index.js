require('dotenv').config()
const express = require('express')
const fileSystem = require('fs');
const app = express()

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

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

// app
app.get('/', (req, res) => {
  res.send('hello-docker con mongodb')
})

app.listen(PORT, () => {
  console.log(`App escuchando en: http://${HOST}:${PORT}`)
})

// Mongodb
var mongoose = require('mongoose');
mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, 
            {
              auth: {
                  user: DB_USER,
                  password: DB_PASS
              },
              authSource:"admin",
              useUnifiedTopology: true,
              useNewUrlParser: true
            }
          )
  .catch(error => { 
    console.log(`Error de conexion con la db: ${error.message}`); 
    process.exit(1)
  });

inicializarDB();

async function inicializarDB(){
  const db = mongoose.connection;
  
  db.on('error', function(){
    console.log('+Error de conexion con la db1')
  });
  db.once('open', function() {
    console.log('+Conectados a mongodb')
    inicializacionColeccion(db, DB_COLLECTION, FILE_PLAYERS);
  });
}

async function inicializacionColeccion (db, dbCollectionName, fileName) {
  console.log('+Inicialización de db')
  try {
    // Borrado de colección si existe
    console.log('+Borrado de colección:', dbCollectionName);
    try {
      await db.collection(dbCollectionName).drop();
      console.log('-Se elimino la colección',dbCollectionName)
    } catch (err) {
      console.log('-No existe la colección',dbCollectionName)
    }

    // Lectura del archivo json
    console.log('+Leyendo arhivo JSON:', fileName);
    let data = fileSystem.readFileSync(fileName, 'utf8');
    let jsonDataset = JSON.parse(data);

    // Carga de datos a la db
    console.log('+Insertando registros en colección:', dbCollectionName);
    await db.collection(dbCollectionName).insertMany(jsonDataset);

    console.log('+Inicializacón finalizada OK');
  } catch (err) {
    throw err;
  }
}