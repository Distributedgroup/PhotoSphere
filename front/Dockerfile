# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build-stage

WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Compilar la aplicación Angular en modo producción
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:latest AS production-stage

# Copiar la aplicación construida al directorio de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar archivo de configuración de Nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf


# Exponer el puerto 80 para recibir tráfico
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
