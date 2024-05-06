# Dockerfile для React приложения
FROM node:14
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
