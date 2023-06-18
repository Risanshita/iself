pipeline {
    agent any

    stages {
        stage('Dev - Build, Unit Tests') {
            steps {
                echo 'Building and executing unit test cases...'
                sleep(time: 30, unit: 'SECONDS')
                echo 'Build completed!'
                // Add deployment steps for Dev environment
            }
        }

        stage('deploy to Dev') {
            steps {
                echo 'Dev deployment done'
            }
        }

        stage('deploy to Qa') {
            steps {
                script {
                    input(message: 'Proceed with deploying to QA environment?', ok: 'Deploy')
                }
                echo 'Deploying to QA environment...'
                sleep(time: 30, unit: 'SECONDS')
                echo 'QA deployment done'
                // Add deployment steps for QA environment
            }
        }

        stage('deploy to Staging') {
            steps {
                script {
                    input(message: 'Proceed with deploying to Staging environment?', ok: 'Deploy')
                }
                echo 'Deploying to Staging environment...'
                sleep(time: 30, unit: 'SECONDS')
                echo 'Staging deployment done'
                // Add deployment steps for Staging environment
            }
        }

        stage('deploy to Prod') {
            steps {
                script {
                    input(message: 'Proceed with deploying to Prod environment?', ok: 'Deploy')
                }
                echo 'Deploying to Prod environment...'
                sleep(time: 30, unit: 'SECONDS')
                echo 'Prod deployment done'
                // Add deployment steps for Prod environment
            }
        }
    }

    post {
        success {
            // Add post-build success actions here
            echo 'Post-build success actions'
        }

        failure {
            // Add post-build failure actions here
            echo 'Post-build failure actions'
        }

        always {
            // Add post-build actions that should always run here
            echo 'Post-build actions'
        }
    }
}
