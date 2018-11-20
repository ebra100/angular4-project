pipeline {
    agent any

    environment {
        PATH ='C:/Program Files/nodejs/'
    }

    stages {
        stage('installing modules'){
            steps {
                echo 'installing node modules'
                bat 'npm install'
            }
        }
        stage('angular build'){
            steps {
                echo 'angular build'
                bat 'ng build --prod'
            }
        }
    }
}