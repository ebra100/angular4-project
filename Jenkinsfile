node {
    def app

    stage('Clone repository') {

        checkout scm
    }
    
    stage('Build image') {
       sh 'docker build -t angular-pipeline .'
       // app = docker.build("ebra1995/test-image")
    }

    stage('run container') {
       sh 'docker run -i --name test -v /var/jenkins_home/workspace/angular-pipeline:/usr/src/app angular-pipeline'
       //  sh 'docker build -t test-images .'
       // app = docker.build("ebra1995/test-image")
    }

    // stage('Push image') {

    //     docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
    //         app.push("latest")
    //     }
    // }
   stage('connect to remote server') {
       sh ' ssh -i "heavenkey.pem" ubuntu@ec2-34-230-253-250.compute-1.amazonaws.com'
       //  sh 'docker build -t test-images .'
       // app = docker.build("ebra1995/test-image")
    }    
}


