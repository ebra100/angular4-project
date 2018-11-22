pipeline {
    agent any
    environment {
        PATH ='C:/Program Files/nodejs'
    }

    stages {
        stage('installing modules'){
            steps {
                withEnv(['PATH+EXTRA=C:/Program Files/Git/bin']) {  
                echo 'installing node modules'
                sh 'npm install'
            }
            }
        }
        stage('angular build'){
            steps {
                withEnv(['PATH+EXTRA=C:/Program Files/Git/bin']) {  
                echo 'angular build'
                sh 'npm run ng build --prod'
            }
            }
        }
    }
}