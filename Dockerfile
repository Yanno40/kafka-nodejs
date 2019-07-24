FROM node:10-alpine

WORKDIR /app

COPY ./kafka-nodejs /app

RUN npm install kafka-node --save && \
	npm install && \
	npm install body-parser

EXPOSE 8080 

CMD [ "node", "app.js" ]