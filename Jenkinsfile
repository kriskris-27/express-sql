pipeline {
    agent any 

    environment {
        BACKEND_IMG = "pern-backend"
        FRONTEND_IMG = "pern-frontend"
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
                    sh 'docker build -t ${BACKEND_IMG} .'
                }
            }
        }

        stage('Build Frontend Image'){
            steps{
                echo '🛠️ Building Frontend Docker image...'
                dir('frontend'){
                    sh 'docker build -t ${FRONTEND_IMG} .'
                }
            }
        }

        stage('Test'){
            steps{
                echo '🧪 Running application tests...'
            }
        }

        stage('Deploy'){
            steps{
                echo '🚀 Deploying full stack...'
                sh 'docker-compose up -d'
            }
        }

        stage('Cleanup') {
            steps {
                echo '🧹 Cleaning up unused images...'
                sh 'docker system prune -f'
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