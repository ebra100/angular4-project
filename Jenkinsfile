node {
    def app

    stage('Clone repository') {

        checkout scm
    }
    
    stage('Build image') {
       sh 'docker-compose up'
       //  sh 'docker build -t test-images .'
       // app = docker.build("ebra1995/test-image")
    }

    stage('Push image') {

        docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
            app.push("latest")
        }
    }
}


