#!/bin/bash
sleep 1s

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

source ssh.env

# Database credentials
ip=$IP
port=$PORT
user=$USER
localAddress=$LOCAL_ADDRESS

ssh -v -p $port "$user@$ip" -L $localAddress -N
