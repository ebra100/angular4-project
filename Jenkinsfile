node {
    def app

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }
    
    stage('Build image and push it') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

       app = docker.build("test-image")
       app.push("${env.BUILD_NUMBER}")
       app.push("latest")
    }

    // stage('Push image') {
    //     docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
    //         app.push("${env.BUILD_NUMBER}")
    //         app.push("latest")
    //     }
    // }
}