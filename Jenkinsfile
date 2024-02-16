pipeline {
    agent any

    tools {
        nodejs 'nodeJS'
    }

    options { buildDiscarder(logRotator(numToKeepStr: '5')) }
    
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
                credentialsId: 'cinecare_backend',
                url: 'git@github.com:CineCare/CineHub-backend.git'

            }
        }

        // stage('install') {
        //     steps {
        //         echo 'performing install...'
        //         sh '''
        //             npm install
        //         '''
        //     }
        // }

        stage('Test build docker') {
            steps {
                withCredentials([file(credentialsId: 'backend_env', variable: 'mySecretEnvFile')]){
                    sh 'cp $mySecretEnvFile $WORKSPACE'
                }
                // sh '''
                    
                //     docker build -t whitedog44/cinehub:backend_latest .

                //     #docker push whitedog44/cinehub:backend_latest
                // '''
                dockerImage = docker.build("whitedog44/cinehub:backend_latest")
                withDockerRegistry([ credentialsId: "dockerHub", url: "" ]) {
                    dockerImage.push()
                }
        }

        // stage('Build docker') {
        //     steps {
        //         sh '''
        //             touch .env
        //             echo "DATABASE_URL=mysql://root:cinehub@cinehub_db:3306/cinehub" >> .env
        //             echo "DATABASE_PROVIDER=mysql" >> .env
        //             echo "APP_PORT=3000" >> .env
        //             docker build -t whitedog44/cinehub:backend_latest .

        //             docker push whitedog44/cinehub:backend_latest
        //         '''
        //     }
        // }

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
