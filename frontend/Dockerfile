# Etapa de construcción
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción
FROM nginx:stable-alpine

# Copiar build de React al servidor de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar nuestro archivo de configuración al lugar correcto
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
