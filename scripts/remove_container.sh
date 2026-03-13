#!/bin/bash

echo "Removing old containers..."

docker rm lms-backend || true
docker rm lms-frontend || true
