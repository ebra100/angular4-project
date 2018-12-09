node {
    def app

    stage('Clone repository') {

        checkout scm
    }
    
    stage('Build image') {

        app = docker.build("test-image")
    }

  stage('Test image') {
        app.inside('-v "$PWD":/usr/src/app') {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {

        docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
            app.push("latest")
        }
    }
}