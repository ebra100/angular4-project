FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN ls

ENTRYPOINT ["/bin/bash", "-c", "usr/src/app/entrypoint.sh"]

