#!/bin/bash

AWS_DEFAULT_REGION=eu-north-1
ACCOUNT_ID=673743775133
REPO_NAME=yash/lms

echo "Starting frontend container..."

docker run -d \
--name lms-frontend \
-p 80:80 \
$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPO_NAME:frontend-latest
