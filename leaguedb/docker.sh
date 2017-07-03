#!/bin/bash

docker kill leaguedb_run
docker rm leaguedb_run
docker build -t leaguedb_app .
docker rmi $(docker images -a | grep "^<none>" | awk '{print $3}')
docker run -d --name leaguedb_run --restart=always -p 80:80 -t leaguedb_app
