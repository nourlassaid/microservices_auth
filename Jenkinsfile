pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USERNAME = 'nour0'
        DOCKER_HUB_PASSWORD = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME = 'monmicroservice-auth'
        DOCKER_IMAGE_TAG = 'latest'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker
                    docker.build("${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                }
            }
        }
        
        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Se connecter à Docker Hub
                    d
                }
            }
        }
     
    }
    
    
}