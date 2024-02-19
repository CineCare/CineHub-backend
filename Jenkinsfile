pipeline {
    agent any

    tools {
        nodejs 'nodeJS'
    }

    options { buildDiscarder(logRotator(numToKeepStr: '5')) }

    environment {
        DOCKER_CREDENTIALS = credentials('dockerHub')
        DOCKER_TAG = "${env.BRANCH_NAME == 'main' ? 'latest' : env.BRANCH_NAME}"
        ENV_ID = "${env.BRANCH_NAME == 'main' ? 'backend_env' : "backend_env_" + env.BRANCH_NAME}"
    }
    
    stages {
        stage('Clean') {
            steps {
                cleanWs()
                sh 'printenv'
                
            }
        }

        stage('pull sources') {
            steps {
                git branch: '${BRANCH_NAME}',
                credentialsId: 'cinecare_backend',
                url: 'git@github.com:CineCare/CineHub-backend.git'
                script {
                    env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
                }
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

        stage('build & push docker image') {
            steps {
                //copy .env file from jenkins credentials to current workspace
                withCredentials([file(credentialsId: "${ENV_ID}", variable: 'envFile')]){
                    sh 'cp $envFile $WORKSPACE'
                }
                //connect to docker hub, build image and push to registry
                sh '''
                    echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                    docker build -t "whitedog44/cinehub:backend_${DOCKER_TAG}" .

                    docker push whitedog44/cinehub:backend_${DOCKER_TAG}
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

    post {
        failure {
            sh "echo ${GIT_COMMIT_MSG}"
            discordSend description: "Jenkins Pipeline Build Backend ${BRANCH_NAME} failed ! ☹️\n\ngit commit message :\n${GIT_COMMIT_MSG}",
            footer: "Better luck next try ?",
            link: "$BUILD_URL",
            result: currentBuild.currentResult,
            title: JOB_NAME,
            webhookURL: "https://discord.com/api/webhooks/1208855718338363572/hPxGKwxnigUMvt0ZaPSsAiU1p8Udkdpg4Yo79UCIfo_lxm7Phbe-JLYdTV-22GFCXvYU"
        }
        success {
            discordSend description: "Jenkins Pipeline Build Backend ${BRANCH_NAME} succeed ! 😎\n\ngit commit message :\n${GIT_COMMIT_MSG}",
            footer: "Good job !",
            link: "$BUILD_URL",
            result: currentBuild.currentResult,
            title: JOB_NAME, webhookURL: "https://discord.com/api/webhooks/1208855718338363572/hPxGKwxnigUMvt0ZaPSsAiU1p8Udkdpg4Yo79UCIfo_lxm7Phbe-JLYdTV-22GFCXvYU"
        }
    }
}
