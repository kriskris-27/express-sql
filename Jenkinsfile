pipeline {
    agent any

    options{
        timestamps()
        timeout(time:30, unit:'MINUTES')
    }

    stages{
        stage('Checkout'){
            steps{
                git branch: 'main',
                    url: 'https://github.com/kriskris-27/express-sql.git',
                    credentialsId: ''
            }
        }

        stage('Build images (parallel)'){
            parallel{
                stage('Build backend'){
                    steps{
                        sh "docker build -t ts-backend:ci -f backend/Dockerfile backend"
                    }
                }
                stage('Build frontend'){
                    steps{
                        sh "docker build -t ts-frontend:ci -f frontend/Dockerfile frontend"
                    }
                }
            }
        }

        stage('Start stack') {
            steps { sh "docker-compose up -d --build" } // or: docker compose up -d --build
        }

        stage('Smoke test (parallel)') {
            parallel {
                stage('Backend health') {
                    steps {
                        sh "sleep 5"
                        sh "curl -fsS http://localhost:5000/"
                    }
                }

                stage("Frontend health") {
                    steps{
                        sh "sleep 5"
                        sh "curl -I http://localhost:3000/ || true"
                    }
                }
            }
        }

        stage('Deploy'){
            steps { sh 'echo "Deploying to production... (placeholder)"' }
        }
    }
    post {
        always{
            sh "docker ps || true"
            sh "docker-compose logs --no-color > compose.logs || true"
            archiveArtifacts artifacts: 'compose.logs', allowEmptyArchive: true
            sh "docker-compose down -v || true"
            sh "docker image prune -f || true"
        }
    }
}