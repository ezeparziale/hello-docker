# hello-docker

Template basico para generar imagenes docker utilizando git actions y subiendolas al docker hub.  

La pagina web se monta sobre nodejs, se crea una base de datos mongodb con información de estadisticas de la nba. Se crea un volumen persistente para que no se pierdan los datos.

Utilizado:

- [X] node.js
- [X] mongodb
- [X] mongo-express
- [X] docker image
- [X] docker compose
- [X] docker hub
- [X] docker volume
- [X] docker network
- [X] github actions
- [X] github package

## Pagina web

![home-img](./src/public/images/home-page.png)

![data-img](./src/public/images/data-page.png)

## Ejecución

Para ejecutar solo hay que correr el archivo docker compose y listo.  

### start

```docker
docker-compose -f "docker-compose.yaml" up -d
```

### stop

```docker
docker-compose -f "docker-compose.yaml" down
```

### browser mongo-express

```http
http:\\localhost:8080
```

![data-img](./src/public/images/mongo-express-page.png)  

### browser web page

```http
http:\\localhost:3000
```

### browser mongodb

```http
http:\\localhost:27017
```

## Log

v1: imagen docker con pagina node.js, inicializacion de db en mongodb con datos de estadisticas de jugadores de nba. Archivo docker-compose listo para ejecutar.  

v2: se mejoro la web para realizar busquedas por campos. Se deja lista la imagen docker.  

v3: se agrego la data de la temporada 2021-2022.

## Comentarios

- Cualquier cosa me avisan!!! Estoy en linea ;)