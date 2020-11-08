#!/bin/bash
sleep 1s

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

ssh -v -p 4141 user01@116.203.24.85 -L 3307:127.0.0.1:3306 -N
