// node {
//     def app

//     stage('Clone repository') {

//         checkout scm
//     }
    
//     stage('Build image') {

//         app = docker.build("ebra1995/test-image")
//     }

//     stage('Install And Build'){

//         app.inside{
//             sh 'npm install'
//             sh 'npm build'
//         }
//     }

//     stage('Push image') {

//         docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
//             app.push("latest")
//         }
//     }
// }

pipeline {
  agent {
    docker {
      image 'ebra1995/test-image'
      args '-v C:/Program Files (x86)/Jenkins/workspace/angular-pipeline:/usr/src/app'
    }
  }
}