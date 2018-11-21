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
                shell 'npm install'
            }
            }
        }
        stage('angular build'){
            steps {
                withEnv(['PATH+EXTRA=/usr/sbin:/usr/bin:/sbin:/bin']) {  
                echo 'angular build'
                shell 'npm run ng build --prod'
            }
            }
        }
    }
}