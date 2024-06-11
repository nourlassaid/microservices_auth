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
                script {
                    withSonarQubeEnv('SonarQube Test') {
                        bat """
                        ${env.MSBUILD_SCANNER_HOME}/SonarScanner.MSBuild.exe begin /k:microservice_auth /d:sonar.login="${env.SONAR_TOKEN}" /d:sonar.host.url="${env.SONAR_HOST_URL}" /d:sonar.projectName="microservice_auth" /d:sonar.projectVersion="4.0" /d:sonar.sources="."
                        msbuild your-solution.sln /t:Rebuild
                        ${env.MSBUILD_SCANNER_HOME}/SonarScanner.MSBuild.exe end /d:sonar.login="${env.SONAR_TOKEN}"
                        """
                    }
                }
            }
        }

        // Add your remaining stages here
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
