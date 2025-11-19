// Jenkins declarative pipeline for building and deploying
// the PERN (Postgres, Express, React, Node) todo app.
pipeline {
    // Run on any available agent with Docker installed.
    agent any

    // General pipeline options for better stability and logs.
    options {
        timestamps()                    // Prepend timestamps to all logs.
        disableConcurrentBuilds()       // Avoid overlapping deployments.
        buildDiscarder(logRotator(numToKeepStr: '20')) // Keep last 20 builds.
        timeout(time: 30, unit: 'MINUTES')             // Fail long-running builds.
        skipDefaultCheckout()           // We do an explicit checkout stage.
    }

    // Image name prefixes used when building Docker images.
    environment {
        BACKEND_IMG = "pern-backend"
        FRONTEND_IMG = "pern-frontend"
    }

    stages {
        // Pull the latest code from the configured SCM.
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        // Install Node.js dependencies for backend and frontend.
        stage('Install Dependencies') {
            steps {
                // Backend dependencies.
                dir('backend') {
                    sh 'npm ci || npm install'
                }
                // Frontend dependencies.
                dir('frontend') {
                    sh 'npm ci || npm install'
                }
            }
        }

        // Basic backend type-check to catch TypeScript errors early.
        stage('Backend Type Check') {
            steps {
                dir('backend') {
                    sh 'npx tsc --noEmit'
                }
            }
        }

        // Frontend linting to enforce code quality before building images.
        stage('Frontend Lint') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                }
            }
        }

        // Generate backend and frontend .env files from Jenkins credentials.
        stage('Generate .env files') {
            steps {
                // Backend .env (port + database URL).
                withCredentials([string(credentialsId: 'BACKEND_DB_URL', variable: 'DB_URL')]) {
                    sh """
cat > backend/.env <<EOF
PORT=5000
DATABASE_URL=$DB_URL
EOF
"""
                }

                // Frontend .env (base API URL used by Vite).
                withCredentials([string(credentialsId: 'FRONTEND_API_URL', variable: 'API_URL')]) {
                    sh """
cat > frontend/.env <<EOF
VITE_API_URL=$API_URL
EOF
"""
                }
            }
        }

        // Stop any containers currently bound to port 5000.
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

        // Build the backend Docker image using backend/Dockerfile.
        stage('Build Backend Image') {
            steps {
                echo 'Building backend Docker image...'
                dir('backend') {
                    sh "docker build -t ${BACKEND_IMG}:${BUILD_NUMBER} ."
                }
            }
        }

        // Build the frontend Docker image using frontend/Dockerfile.
        stage('Build Frontend Image') {
            steps {
                echo 'Building frontend Docker image...'
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMG}:${BUILD_NUMBER} ."
                }
            }
        }

        // Bring the stack down and back up with docker-compose.
        stage('Deploy') {
            // Only deploy from the main branch.
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying full stack...'
                sh 'docker-compose down --remove-orphans'
                sh 'docker-compose up -d'
            }
        }
    }

    // Post-build notifications and final cleanup.
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
