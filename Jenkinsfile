pipeline {
    agent any

    stages {
        stage('Dev') {
            steps {
                echo 'Deploying to Dev environment...'
                // Add deployment steps for Dev environment
            }
        }

        stage('QA') {
            steps {
                input {
                    message "Proceed with deploying to QA environment?"
                    ok "Deploy"
                }

                sleep(time: 60, unit: 'SECONDS')

                echo 'Deploying to QA environment...'
                // Add deployment steps for QA environment
            }
        }

        stage('Staging') {
            steps {
                input {
                    message "Proceed with deploying to Staging environment?"
                    ok "Deploy"
                }

                sleep(time: 60, unit: 'SECONDS')

                echo 'Deploying to Staging environment...'
                // Add deployment steps for Staging environment
            }
        }

        stage('Prod') {
            steps {
                input {
                    message "Proceed with deploying to Prod environment?"
                    ok "Deploy"
                }

                sleep(time: 60, unit: 'SECONDS')

                echo 'Deploying to Prod environment...'
                // Add deployment steps for Prod environment
            }
        }
    }

    post {
        always {
            // Add post-build actions here
            // These steps will always run, regardless of the build status
        }

        success {
            // Add success-specific actions here
            // These steps will only run if the build succeeds
        }

        failure {
            // Add failure-specific actions here
            // These steps will only run if the build fails
        }
    }
}
