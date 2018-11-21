pipeline {
    agent any
    environment {
        PATH ='C:/Program Files/nodejs'
    }

    stages {
        stage('installing modules'){
            steps {
                withEnv(['PATH+EXTRA=/usr/sbin:/usr/bin:/sbin:/bin']) {  
                echo 'installing node modules'
                bat 'sh -c npm install'
            }
            }
        }
        stage('angular build'){
            steps {
                withEnv(['PATH+EXTRA=/usr/sbin:/usr/bin:/sbin:/bin']) {  
                echo 'angular build'
                bat ' sh -c npm run ng build --prod'
            }
            }
        }
    }
}