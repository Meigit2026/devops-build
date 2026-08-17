pipeline {
    agent any

    environment {
        IMAGE_NAME = 'meiviezhidocker/dev'
        IMAGE_TAG = "build-${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/dev']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Meigit2026/devops-build.git'
                    ]]
                ])
            }
        }

        stage('Test AWS Connection') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-credentials',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=ap-south-1
                        aws sts get-caller-identity
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t $IMAGE_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo $DOCKER_PASS | docker login \
                            -u $DOCKER_USER \
                            --password-stdin

                        docker push $IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-credentials',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=ap-south-1

                        aws eks update-kubeconfig \
                            --region ap-south-1 \
                            --name devops-capstone

                        echo "Checking EKS nodes..."
                        kubectl get nodes

                        echo "Applying Kubernetes configuration..."
                        kubectl apply -f deployment.yaml

                        echo "Updating deployment image..."
                        kubectl set image deployment/devops-build \
                            devops-build=$IMAGE_NAME:$IMAGE_TAG

                        echo "Waiting for rollout..."
                        kubectl rollout status deployment/devops-build
                    '''
                }
            }
        }
    }
}