pipeline {
    agent any 

    environment {
        BACKEND_IMG = "pern-backend"
        FRONTEND_IMG = "pern-frontend"
        GIT_BASH = "C:/Program Files/Git/bin/bash.exe"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '✅ Checking out source code...'
                checkout scm
            }
        }

        stage('Generate .env files') {
            steps {
                // Backend .env
                withCredentials([string(credentialsId: 'BACKEND_DB_URL', variable: 'DB_URL')]) {
                    writeFile file: 'backend/.env', text: """
PORT=5000
DATABASE_URL=${DB_URL}
"""
                }

                // Frontend .env
                withCredentials([string(credentialsId: 'FRONTEND_API_URL', variable: 'API_URL')]) {
                    writeFile file: 'frontend/.env', text: """
VITE_API_URL=${API_URL}
"""
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                echo '🛠️ Building backend Docker image...'
                dir('backend') {
                    bat "\"%GIT_BASH%\" -c \"docker build -t ${BACKEND_IMG} .\""
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo '🛠️ Building frontend Docker image...'
                dir('frontend') {
                    bat "\"%GIT_BASH%\" -c \"docker build -t ${FRONTEND_IMG} .\""
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying full stack...'
                bat "\"%GIT_BASH%\" -c \"docker-compose up -d\""
            }
        }

        stage('Cleanup') {
            steps {
                echo '🧹 Cleaning up unused images...'
                bat "\"%GIT_BASH%\" -c \"docker system prune -f\""
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
        always {
            echo '🔄 Cleanup completed'
                            bat "\"%GIT_BASH%\" -c \"docker system prune -f\""

        }
    }
}
