FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

CMD /usr/src/app/entrypoint.sh

