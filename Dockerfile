FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

VOLUME . /usr/src/app

COPY . /usr/src/app/

EXPOSE 4200

CMD /usr/src/app/entrypoint.sh
