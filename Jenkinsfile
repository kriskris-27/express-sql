pipeline {
    agent any

    environment {
        BACKEND_IMG = "pern-backend"
        FRONTEND_IMG = "pern-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Generate .env files') {
            steps {
                // Backend .env
                withCredentials([string(credentialsId: 'BACKEND_DB_URL', variable: 'DB_URL')]) {
                    sh """
cat > backend/.env <<EOF
PORT=5000
DATABASE_URL=$DB_URL
EOF
"""
                }

                // Frontend .env
                withCredentials([string(credentialsId: 'FRONTEND_API_URL', variable: 'API_URL')]) {
                    sh """
cat > frontend/.env <<EOF
VITE_API_URL=$API_URL
EOF
"""
                }
            }
        }

        stage('Pre-Cleanup') {
            steps {
                echo 'Cleaning up any running containers on port 5000...'
                sh '''
CONTAINERS=$(docker ps -q --filter "publish=5000")
if [ -n "$CONTAINERS" ]; then
  docker rm -f $CONTAINERS
fi
'''
            }
        }

        stage('Build Backend Image') {
            steps {
                echo 'Building backend Docker image...'
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMG}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMG}:${BUILD_NUMBER} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying full stack...'
                sh 'docker-compose down --remove-orphans'
                sh 'docker-compose up -d'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up unused images and dangling containers...'
                sh 'docker system prune -f'
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
        always {
            echo 'Final cleanup completed'
            sh 'docker system prune -f'
        }
    }
}
