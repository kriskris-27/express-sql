pipeline {
    agent any

    environment {
        BACKEND_IMG = "pern-backend"
        FRONTEND_IMG = "pern-frontend"
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
                    sh 'echo "PORT=5000\nDATABASE_URL=$DB_URL" > backend/.env'
                }

                // Frontend .env
                withCredentials([string(credentialsId: 'FRONTEND_API_URL', variable: 'API_URL')]) {
                    sh 'echo "VITE_API_URL=$API_URL" > frontend/.env'
                }
            }
        }

        stage('Pre-Cleanup') {
            steps {
                echo "🧹 Cleaning up any running containers on port 5000..."
                sh 'docker ps -q --filter "publish=5000" | xargs -r docker rm -f'
            }
        }

        stage('Build Backend Image') {
            steps {
                echo '🛠️ Building backend Docker image...'
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMG}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo '🛠️ Building frontend Docker image...'
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMG}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying full stack...'
                sh 'docker-compose down --remove-orphans'
                sh 'docker-compose up -d'
            }
        }

        stage('Cleanup') {
            steps {
                echo '🧹 Cleaning up unused images and dangling containers...'
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
            echo '🔄 Final cleanup completed'
            sh 'docker system prune -f'
        }
    }
}
