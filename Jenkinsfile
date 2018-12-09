// node {
//     def app

//     stage('Clone repository') {

//         checkout scm
//     }
    
//     stage('Build image') {

//         app = docker.build("ebra1995/test-image")
//     }

//   stage('Test image') {
//         app.inside('-v C:/users/ebrahim/desktop/angular:/usr/src/app') {
//             sh 'echo "Tests passed"'
//         }
//     }

//     stage('Push image') {

//         docker.withRegistry('https://registry.hub.docker.com','docker-hub-credentials') {
//             app.push("latest")
//         }
//     }
// }


node {
        stage("Main build") {

            checkout scm

            docker.image('ruby:2.3.1').inside {

              stage("Install Bundler") {
                sh "gem install bundler --no-rdoc --no-ri"
              }

              stage("Use Bundler to install dependencies") {
                sh "bundle install"
              }

              stage("Build package") {
                sh "bundle exec rake build:deb"
              }

              stage("Archive package") {
                archive (includes: 'pkg/*.deb')
              }

           }

        }

        // Clean up workspace
        step([$class: 'WsCleanup'])

}