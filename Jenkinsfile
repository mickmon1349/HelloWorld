pipeline {
  agent any

  environment {
    PROJECT_ID = 'callme-op-419108'
    REPO_NAME = 'mickmon-repo'
    REGION = 'asia-east1'
    IMAGE_NAME = 'hello_world_jenkins'
    IMAGE_PATH = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}"
  }

  stages {
    stage('Checkout') {
            stage('Checkout') {
                steps {
                        git branch: 'main', url: 'https://github.com/mickmon1349/HelloWorld.git'
            }
      }
    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'echo "Hello World test success"'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t ${IMAGE_PATH}:latest .'
      }
    }

    stage('Push to Artifact Registry') {
      steps {
        withCredentials([file(credentialsId: 'gcp_artifact_key', variable: 'GCP_KEY')]) {
          sh 'gcloud auth activate-service-account --key-file=${GCP_KEY}'
          sh 'gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet'
          sh 'docker push ${IMAGE_PATH}:latest'
        }
      }
    }

    stage('Deploy to Cloud Run') {
      steps {
        withCredentials([file(credentialsId: 'gcp_artifact_key', variable: 'GCP_KEY')]) {
          sh 'gcloud auth activate-service-account --key-file=${GCP_KEY}'
          sh 'gcloud run deploy ${IMAGE_NAME} \
                --image ${IMAGE_PATH}:latest \
                --region ${REGION} \
                --platform managed \
                --allow-unauthenticated \
                --project ${PROJECT_ID}'
        }
      }
    }
  }
}
}