pipeline {
    agent any

    tools {
        nodejs 'nodeJS'
    }

    options { buildDiscarder(logRotator(numToKeepStr: '5')) }

    environment {
        DOCKER_CREDENTIALS = credentials('dockerHub')
        PORTAINER_TOKEN = credentials('portainer_token')
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
                git branch: 'main',
                credentialsId: 'cinecare_backend',
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

        stage('build docker') {
            steps {
                withCredentials([file(credentialsId: 'backend_env', variable: 'mySecretEnvFile')]){
                    sh 'cp $mySecretEnvFile $WORKSPACE'
                }
                //sh 'echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin'
                sh '''
                    echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                    docker build -t whitedog44/cinehub:backend_latest .

                    docker push whitedog44/cinehub:backend_latest
                '''
            }
        }

        stage('Update stack portainer') {
            steps {
                sh '''
                    curl -X POST -H "X-API-Key: ptr_lsw9kZuMqb8cSOEdoWlmlp1icGV18A6beI007zpUOJA=" https://portainer.codevert.org/api/stacks/4/stop?endpointId=2 &&
                    curl -X POST -H "X-API-Key: ptr_lsw9kZuMqb8cSOEdoWlmlp1icGV18A6beI007zpUOJA=" https://portainer.codevert.org/api/stacks/4/start?endpointId=2
                '''
            }
        }

        stage('test using credential') {
            steps {
                configFileProvider([configFile(fileId: 'portainer_token', variable: 'portainer_token')]) {
                    echo $portainer_token
                }
            }
        }
    }
}
