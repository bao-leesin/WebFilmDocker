# syntax=docker/dockerfile:1

FROM node:14-alpine
ENV NODE_ENV=production

WORKDIR /

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "src/index.js" ]