#!/bin/bash
sleep 1s

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

#for i in $(cat .env); do
#   export $i;
#done;
#sleep 10;

npx run knex migrate:latest;
