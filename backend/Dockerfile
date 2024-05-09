FROM node:22-alpine

RUN mkdir -p /backend && chown -R node:node /backend

WORKDIR /backend

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8081

CMD [ "npm", "run" ]