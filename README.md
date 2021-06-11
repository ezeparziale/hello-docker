## hello-docker

Template basico para generar imagenes docker utilizando git actions y subiendolas al docker hub.

## to do

mini web con mongodb

* [x] conexion con mongodb
* [x] inicializacion de bd
* [x] creacion de imagen
* [x] actualizacion de docker-compose 
* [x] visualizacion de datos en la pagina
* [x] creacion de package v1
* [x] busqueda por campos

## run

start
```docker
docker-compose -f "docker-compose.yaml" up -d
```

stop
```docker
docker-compose -f "docker-compose.yaml" down
```

browser mongo-express
```
http:\\localhost:8080
```

browser index
```
http:\\localhost:3000
```

browser mongodb
```
http:\\localhost:27017
```

## log

v1: imagen docker con pagina node.js, inicializacion de db en mongodb con datos de estadisticas de jugadores de nba. Archivo docker-compose listo para ejecutar.  

v2: se mejoro la web para realizar busquedas por campos. Se deja lista la imagen docker.