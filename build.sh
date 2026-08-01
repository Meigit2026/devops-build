!#/bin/bash
set -e

echo "======== Building Docker Image ===="
docker build -t devops-build:v1 .

echo "Docker Image built successfully."
