#!/bin/bash

echo "Stopping existing containers..."

docker stop lms-backend || true
docker stop lms-frontend || true
