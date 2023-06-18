pipeline {
    agent  any
    stages {
        stage('deployments') {
            parallel {
                stage('deploy to stg') {
                    steps {
                        echo 'stg deployment done'
                    }
                }
               stage('stg signoff') {
                    steps {
                        input "Does the staging environment look ok?"
                    }
                }
                stage('deploy to prod') {
                    input {
                        message 'Approve for prod?'
                        ok 'Approve'
                    }
                    steps {
                        echo 'prod deployment done'
                    }
                }
            }
        }
    }
}
