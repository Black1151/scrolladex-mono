#!/bin/sh

# Hosts
BACKEND_HOST="backend"
FRONTEND_HOST="frontend"

# Ports
BACKEND_PORT="3333"
FRONTEND_PORT="3000"

# Function to check if a service is ready
wait_for_service() {
    local host=$1
    local port=$2

    while ! nc -z $host $port; do
        echo "Waiting for $host..."
        sleep 1
    done
}

# Wait for backend and frontend
wait_for_service $BACKEND_HOST $BACKEND_PORT
wait_for_service $FRONTEND_HOST $FRONTEND_PORT

# Start Nginx
echo "Starting Nginx..."

# Start nginx and display any error message.
nginx -g "daemon off;" || (echo "Nginx failed to start" && exit 1)