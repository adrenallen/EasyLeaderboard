FROM node:latest

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 6999
CMD [ "npm", "start" ]