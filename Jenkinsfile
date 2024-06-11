pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'nour0/formationfrontend:latest'
        SONARQUBE_SERVER = 'SonarQube' // Nom du serveur SonarQube configuré dans Jenkins
        KUBECONFIG_CREDENTIALS_ID = 'kubeconfig' // ID des credentials pour K8s
        DOCKER_PATH = "C:\\Program Files\\Docker\\cli-plugins"
        NODEJS_PATH = "C:\\Program Files\\nodejs"
        PATH = "${DOCKER_PATH};${NODEJS_PATH};${env.PATH}"  // Utilisez ';' pour Windows
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                script {
                    bat 'npm install'
                    bat 'npm install node-pre-gyp'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube Scanner'
                    withSonarQubeEnv('SonarQube') {
                        bat 'npm run sonar'
                    }
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build --no-cache -t nour0/formationfrontend:latest -f Dockerfile .'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_TOKEN')]) {
                        docker.withRegistry('https://index.docker.io/v1/', 'DOCKER_TOKEN') {
                            bat "docker push nour0/formationfrontend:latest"
                        }
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withKubeConfig([credentialsId: KUBECONFIG_CREDENTIALS_ID]) {
                        bat 'kubectl apply -f auth-deployment.yaml/deployment.yaml'
                    }
                }
            }
        }

       
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
