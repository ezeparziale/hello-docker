## hello-docker

template basico para generar imagenes docker utilizando git actions y subiendolas al docker hub.

## to do

mini web con mongodb y mongo-express

* [x] conexion con mongodb
* [x] inicializacion de bd
* [x] creacion de imagen
* [x] actualizacion de docker-compose 
* [ ] visualizacion de datos en la pagina
* [ ] creacion de package

## run

start
```docker
docker-compose -f "docker-compose.yaml" up -d
```

stop
```docker
docker-compose -f "docker-compose.yaml" down
```