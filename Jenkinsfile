pipeline {
    agent any
    
    environment {
        PATH ='C:/Program Files/nodejs/'
    }

    stages {
        stage('installing modules'){
            steps {
                echo 'installing node modules'
                sh 'npm install'
            }
        }
        stage('angular build'){
            steps {
                echo 'angular build'
                sh 'ng build --prod'
            }
        }
    }
}