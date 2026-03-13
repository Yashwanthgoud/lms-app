#!/bin/bash

AWS_DEFAULT_REGION=eu-north-1
ACCOUNT_ID=673743775133
REPO_NAME=yash/lms

echo "Starting backend container..."

docker run -d \
--name lms-backend \
-p 8080:8080 \
$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPO_NAME:backend-latest
