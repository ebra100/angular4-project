node {
    def app

    stage('Clone repository') {

        checkout scm
    }
    
    stage('Build image') {

        app = docker.build("ebra1995/test-image").withRun {c ->
        sh 'echo here from inside container'}
    }

    stage('Push image') {

        docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
            app.push("latest")
        }
    }
}


