# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación Angular en modo producción
RUN npm run build --configuration=production

# Verificar que la carpeta dist/ se generó correctamente
RUN ls -lah /app/dist/

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de Angular construidos en la imagen de Nginx
COPY --from=build /app/dist/front /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
