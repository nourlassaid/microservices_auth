pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Program Files\\Docker\\cli-plugins"
        PATH = "${DOCKER_PATH};${NODEJS_PATH};${PATH}"  // Utilisez ';' pour Windows
        NODEJS_PATH = "C:\\Program Files\\nodejs"  // Chemin d'accès correct à Node.js
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

       

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage ('Scan and Build Jar File') {
            steps {
                withSonarQubeEnv(installationName: 'SonarQube ', credentialsId: 'SonarQubeToken') {
                    sh 'mvn clean package sonar:sonar'
                }
            }
        }

        stage('Build Docker image') {
            steps {
                script {
                    bat 'docker build --no-cache -t nour0/formationfrontend:latest -f Dockerfile .'
                }
            }
        }

        stage('Deploy Docker image') {
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

        stage('Kubernetes Deployment') {
            steps {
                script {
                    bat 'kubectl apply -f auth-deployment.yaml' 
                }
            }
        }
    }

    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
