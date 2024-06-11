pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        PATH = "${DOCKER_PATH}:${PATH}"
       
        NODEJS_PATH = "C:\\Programmes (x86)\\nodejs"
        SONAR_SCANNER_HOME = "C:\\Program Files\\sonar-scanner-5.0.1.3006-windows"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }
        stage('Build and Rename Docker Image') {
            steps {
                script {
                    // Construire l'image Docker (ajustez la commande selon vos besoins)
                    bat 'docker build -t nour0/formationfrontend:%BUILD_ID% .'
                    // Installer les dépendances et exécuter les tests
                    bat 'npm install'

                    // Renommer l'image Docker
                    bat "docker tag nour0/formationfrontend:%BUILD_ID% nour0/formationfrontend:latest"
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                // Exécuter l'analyse SonarQube
                withSonarQubeEnv('sonarquabe') {
                    bat '"C:\Users\MSAR\Desktop\sonarqube-10.5.1.90531\bin\windows-x86-64 " -Dsonar.projectKey=microservice_auth'
                }
            }
        }
    }
}