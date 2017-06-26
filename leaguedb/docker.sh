#!/bin/bash

docker rm leaguedb_run
docker kill leaguedb_run
docker build -t leaguedb_app .
docker run -d --name leaguedb_run --restart=always -p 80:80 -t leaguedb_app -v 
