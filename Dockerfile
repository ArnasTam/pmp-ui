FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD npx http-server -p $PORT ./build