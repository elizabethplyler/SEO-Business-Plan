#!/bin/bash

# Script to kill any process on port 3000 and restart the dev server

echo "Checking for processes on port 3000..."

# Find and kill any process running on port 3000
PID=$(lsof -ti:3000)

if [ -z "$PID" ]; then
    echo "No process found on port 3000"
else
    echo "Killing process $PID on port 3000..."
    kill -9 $PID
    sleep 1
    echo "Process killed successfully"
fi

echo "Starting dev server on localhost:3000..."
npm run dev
