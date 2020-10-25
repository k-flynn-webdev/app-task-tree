#!/bin/bash
pkill node

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

export testEnvironment="Node"
npm test
