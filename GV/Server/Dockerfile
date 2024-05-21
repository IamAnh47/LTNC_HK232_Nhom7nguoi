FROM node:alpine

WORKDIR /the-coffee-api
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]