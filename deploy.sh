!#/bin/bash
set -e
echo "======== Deploying Docker Container ===="
docker compose down
docker compose up -d
echo "Docker Container deployed successfully."