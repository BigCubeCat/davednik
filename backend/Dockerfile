FROM node:alpine as base

WORKDIR /

COPY package.json ./

RUN rm -rf node_modules && npm i

COPY . .

CMD ["node", "./bin/www"]
