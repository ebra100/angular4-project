pipeline {
    agent any
    
    environment {
        PATH ="C:\\Program Files\\Git\\usr\\bin ;C:\\Program Files\\nodejs\\" 
    }

    stages {
        stage('installing modules'){
            steps {
                echo 'installing node modules'
                 bat 'sh -c npm install'
            }
        }
        stage('angular build'){
            steps {
                echo 'angular build'
                 bat 'sh -c ng build --prod'
            }
        }
    }
}