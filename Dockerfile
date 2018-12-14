FROM node:7

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

EXPOSE 4200

CMD /var/jenkins_home/workspace/angular-pipeline/entrypoint.sh

