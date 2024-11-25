FROM node:lts as build

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY . .

RUN npm install

RUN test -f .env || cp .env.example .env

EXPOSE 3333

CMD [ "npm", "run", "start:debug" ]