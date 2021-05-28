# imagen a utlizar de docker
# https://hub.docker.com/_/node
FROM node:16-alpine

# creamos el directorio que va a guardar los archivos
RUN mkdir -p /home/hello-docker

# copiamos todo el contenido a la imagen de docker
COPY ./src /home/hello-docker

# seteamos el directorio de trabajo
WORKDIR /home/hello-docker

# instalamos los paquetes necesarios
RUN npm install

# ejecutamos node index.js
CMD ["node", "index.js"]