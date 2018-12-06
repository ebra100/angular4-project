
node('docker') {
 
    stage 'Checkout'
        checkout scm

    stage 'docker'
        sh "docker-compose -f docker-compose up --force-recreate --abort-on-container-exit"
}