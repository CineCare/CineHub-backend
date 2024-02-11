pipeline {
    agent any
    
    stages {
        stage('Clean') {
            steps {
                sh 'printenv'
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                // checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                // userRemoteConfigs: [credentialsId: 'Whitedog_credentials',[url: 'git@github.com:CineCare/CineHub-backend.git']]])

                git branch: 'main',
                credentialsId: 'Whitedog_credentials',
                url: 'git@github.com:CineCare/CineHub-backend.git'

            }
        }

        stage('install') {
            steps {
                echo 'performing install'
                sh '''
                    ls -l
                '''
                
            }
        }

        

        // stage('Update ') {
        //     steps {
        //         sh '''
        //             npm run build
        //             rm -r /var/www/codevert/backend/dist
        //             cp -r dist/ /var/www/codevert/backend/dist
        //             cp /var/www/codevert/backend/.env .
        //             docker build -t whitedog/node-web-app:latest .
        //             docker service update --force codevert_backend
        //         '''
        //     }
        // }
    }
}
