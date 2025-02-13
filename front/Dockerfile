# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build -- --configuration=production

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos de la aplicación Angular al servidor Nginx
COPY --from=build /app/dist/front /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que correrá Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
