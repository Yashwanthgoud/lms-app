#!/bin/bash

AWS_DEFAULT_REGION=eu-north-1
ACCOUNT_ID=673743775133

echo "Logging into Amazon ECR..."

aws ecr get-login-password --region $AWS_DEFAULT_REGION \
| docker login --username AWS \
--password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
