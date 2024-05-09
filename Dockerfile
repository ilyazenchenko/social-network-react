FROM node:18-alpine
WORKDIR /react-docker-example/
CMD ["npm", "start"]
COPY public/ /react-docker-example/public
COPY package.json /react-docker-example/
RUN npm install
COPY src/ /react-docker-example/src