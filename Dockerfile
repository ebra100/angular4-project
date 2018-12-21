FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN pwd

CMD  ["sh","-c","rm -r node_modules && npm cache clean && npm install --force && npm run ng build"]
