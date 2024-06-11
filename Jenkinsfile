pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
        CHROME_BIN = '/usr/bin/google-chrome'
        DOCKER_HUB_REGISTRY = 'docker.io'
        SONARQUBE_SCANNER_HOME = tool name: 'SonarQubeScanner'
        MSBUILD_SCANNER_HOME = tool name: 'SonarScannerMSBuild'
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

        stage('Build Node.js App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Exécuter l'analyse SonarQube
                withSonarQubeEnv('sonarquabe') {
                    bat '"%SONARQUBE_SCANNER_HOME%/bin/sonar-scanner.bat"'
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
