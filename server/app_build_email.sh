#!/bin/bash
sleep 1s

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

#pm2 start ./config/pm2.config.js
npm run build_email
