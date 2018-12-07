FROM node:9.5

COPY . /app

RUN chmod -R 777 /app/data

RUN cd /app && npm install

WORKDIR "/app"

CMD [ "node", "bot.js" ]