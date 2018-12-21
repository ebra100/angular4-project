FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN ls

CMD  ["sh","-c","pwd &&npm install --force && npm run ng build"]


