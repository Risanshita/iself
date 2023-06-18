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
                script {
                    input(message: "Proceed with deploying to QA environment?", ok: "Deploy")
                }

                sleep(time: 60, unit: 'SECONDS')

                echo 'Deploying to QA environment...'
                // Add deployment steps for QA environment
            }
        }

        stage('Staging') {
            steps {
                script {
                    input(message: "Proceed with deploying to Staging environment?", ok: "Deploy")
                }

                sleep(time: 60, unit: 'SECONDS')

                echo 'Deploying to Staging environment...'
                // Add deployment steps for the Staging environment
            }
        }

        stage('Prod') {
            steps {
                script {
                    input(message: "Proceed with deploying to Prod environment?", ok: "Deploy")
                }

                sleep(time: 60, unit: 'SECONDS')

                echo 'Deploying to Prod environment...'
                // Add deployment steps for the Prod environment
            }
        }
    }

    post {
        success {
            script {
                // Add post-build success actions here
            }
        }

        failure {
            script {
                // Add post-build failure actions here
            }
        }

        always {
            script {
                // Add post-build actions that should always run here
            }
        }
    }
}
