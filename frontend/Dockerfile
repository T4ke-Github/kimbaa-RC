FROM node:10-alpine

RUN mkdir -p /frontend && chown -R node:node /frontend

WORKDIR /frontend

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "start" ]