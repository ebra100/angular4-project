FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN pwd

CMD  ["sh","-c","npm cache clean&&npm install -g npm &&npm install --force && npm run ng build"]


