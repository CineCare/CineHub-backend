pipeline {
    agent any

    tools {
        nodejs 'nodeJS'
    }
    
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
                credentialsId: 'Whitedog',
                url: 'git@github.com:CineCare/CineHub-backend.git'

            }
        }

        stage('install') {
            steps {
                echo 'performing install...'
                sh '''
                    npm install
                '''
            }
        }

        stage('Build docker') {
            steps {
                sh '''
                    cp /home/whitedog/web/cinecare/backend/.env .
                    docker build -t whitedog44/cinehub:backend_latest .

                    docker push whitedog44/cinehub:backend_latest
                '''
            }
        }

        // stage('Update stack portainer') {
        //     steps {
        //         sh '''
        //             docker service update --image whitedog44/cinehub:backend_latest cinehub_backend
        //         '''
        //     }
        // }

        

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
