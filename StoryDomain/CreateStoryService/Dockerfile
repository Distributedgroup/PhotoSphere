# Etapa 1: Construcción del binario
FROM golang:1.19-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY go.mod go.sum ./
RUN go mod download

# Copiar el resto de los archivos
COPY . .

# Compilar la aplicación en modo release
RUN go build -o CreateStoryService main.go

# Etapa 2: Imagen final mínima
FROM alpine:latest

# Establecer el directorio de trabajo
WORKDIR /root/

# Copiar el binario desde la etapa de compilación
COPY --from=builder /app/CreateStoryService .

# Crear la carpeta de uploads y sus subcarpetas necesarias
RUN mkdir -p /root/uploads/covers /root/uploads/posts /root/uploads/stories

# Asignar permisos de escritura a la carpeta de uploads
RUN chmod -R 777 /root/uploads

# Exponer el puerto correcto (4201 según Postman)
EXPOSE 4201

# Comando de inicio del contenedor
CMD ["./CreateStoryService"]
