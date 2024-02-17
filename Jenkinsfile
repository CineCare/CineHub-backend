pipeline {
    agent any

    tools {
        nodejs 'nodeJS'
    }

    options { buildDiscarder(logRotator(numToKeepStr: '5')) }

    environment {
        DOCKER_CREDENTIALS = credentials('dockerHub')
    }
    
    stages {
        stage('Clean') {
            steps {
                cleanWs()
            }
        }

        stage('pull sources') {
            steps {
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

        stage('build & push docker image') {
            steps {
                //copy .env file from jenkins credentials to current workspace
                withCredentials([file(credentialsId: 'backend_env', variable: 'mySecretEnvFile')]){
                    sh 'cp $mySecretEnvFile $WORKSPACE'
                }
                //connect to docker hub, build image and push to registry
                sh '''
                    echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                    docker build -t whitedog44/cinehub:backend_latest .

                    docker push whitedog44/cinehub:backend_latest
                '''
            }
        }

        stage('Update stack portainer') {
            steps {
                //stop and restart portainer stack via api
                withCredentials([string(credentialsId: 'portainer_token', variable: 'TOKEN')]) { //set SECRET with the credential content
                    sh '''
                        curl -X POST -H "X-API-Key: ${TOKEN}" https://portainer.codevert.org/api/stacks/4/stop?endpointId=2 &&
                        curl -X POST -H "X-API-Key: ${TOKEN}" https://portainer.codevert.org/api/stacks/4/start?endpointId=2
                    '''
                }
            }
        }
    }
}
