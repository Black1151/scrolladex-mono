
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

RUN apk add --no-cache curl

CMD [ "npm", "run", "dev" ]
