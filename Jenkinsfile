node {
    def app

    stage('Clone repository') {

        checkout scm
    }
    
    stage('Build image') {

        app = docker.build("ebra1995/test-image").inside("--volume=/var/run/docker.sock:/var/run/docker.sock --add-host dockerhost:${hostIP}") {
   sh 'echo hey ebra'
}
    }

//   stage('Test image') {
//         app.inside('-v C:/users/ebrahim/desktop/angular:/usr/src/app') {
//             sh 'echo "Tests passed"'
//         }
//     }

    stage('Push image') {

        docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
            app.push("latest")
        }
    }
}


