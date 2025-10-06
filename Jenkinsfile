pipeline {
    agent any 

    environment {
        BACKEND_IMG = "pern-backend"
        FRONTEND_IMG = "pern-frontend"
        GIT_BASH = "C:/Program Files/Git/bin/bash.exe"
    }

    stages {
        stage('Checkout'){
            steps {
                echo '✅ Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Build Backend Image'){
            steps{
                echo '🛠️ Building backend Docker image...'
                dir('backend'){
                    bat "\"%GIT_BASH%\" -c \"docker build -t ${BACKEND_IMG} .\""
                }
            }
        }

        stage('Build Frontend Image'){
            steps{
                echo '🛠️ Building Frontend Docker image...'
                dir('frontend'){
                    bat "\"%GIT_BASH%\" -c \"docker build -t ${FRONTEND_IMG} .\""
                }
            }
        }

        stage('Test'){
            steps{
                echo '🧪 Running application tests...'
                // Add your test commands here
            }
        }

        stage('Deploy'){
            steps{
                echo '🚀 Deploying full stack...'
                // Use full path for docker-compose if needed
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
        }
    }
}
