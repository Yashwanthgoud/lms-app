#!/bin/bash

AWS_DEFAULT_REGION=eu-north-1
ACCOUNT_ID=673743775133
REPO_NAME=yash/lms

echo "Pulling latest images from ECR..."

docker pull $ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPO_NAME:backend-latest
docker pull $ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPO_NAME:frontend-latest
