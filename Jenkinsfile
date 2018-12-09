node {
    def app

    stage('Clone repository') {

        checkout scm
    }
    
    stage('Build image') {

        app = docker.build("ebra1995/test-image").inside('-v C:/Program Files (x86)/Jenkins/workspace/angular-pipeline:/usr/src/app')
    }

    // stage('Install And Build'){

    //     app.inside{
    //         sh 'npm install'
    //         sh 'npm build'
    //     }
    // }

    stage('Push image') {

        docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
            app.push("latest")
        }
    }
}