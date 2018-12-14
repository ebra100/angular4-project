node {
    def app

    stage('Clone repository') {

        checkout scm
    }
    
    stage('Build image') {
        sh 'docker build -t test-images .'
       // app = docker.build("ebra1995/test-image")
    }

  stage('Test image') {
      sh 'docker run -v /var/jenkins_home/workspace/angular-pipeline:/usr/src/app test-images'
    }

    stage('Push image') {

        docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
            app.push("latest")
        }
    }
}


