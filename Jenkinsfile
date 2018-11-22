pipeline {
    agent any
    environment {
        PATH ='C:/Program Files/nodejs ;C:/Program Files/Git/bin '
    }

    stages {
        stage('installing modules'){
            steps {
                withEnv(['PATH+EXTRA=/usr/sbin:/usr/bin:/sbin:/bin']) {  
                echo 'installing node modules'
                sh 'npm install'
            }
            }
        }
        stage('angular build'){
            steps {
                withEnv(['PATH+EXTRA=/usr/sbin:/usr/bin:/sbin:/bin']) {  
                echo 'angular build'
                sh 'npm run ng build --prod'
            }
            }
        }
    }
}