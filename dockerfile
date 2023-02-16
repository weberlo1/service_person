FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=dev

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install