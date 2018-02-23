#!/bin/sh

EXIST_BLUE=$(docker ps | grep app_blue)

if [ -z "$EXIST_BLUE" ]; then
    docker-compose up -d app_blue
    docker-compose stop app_green
    echo "run app_blue!!"
else
    docker-compose up -d app_green
    docker-compose stop app_blue
    echo "run app_green!!"
fi