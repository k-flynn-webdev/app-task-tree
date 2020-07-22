#!/bin/bash

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

source vars.dev.env

# Database credentials
user=$DATABASE_USER
password=$DATABASE_PASS
host=$DATABASE_URL
port=$DATABASE_PORT
db_name="TEST_123"

# Other options
#restore_path="$HOME/studio_backup/mysql/DAYTASK-21-Jul-2020.sql"
#date=$(date +"%d-%b-%Y")

mysql --user=$user --password=$password --host=$host --port=$port;
#mysql create database $db_name;

#mysql --user=$user --password=$password --host=$host --port=$port $db_name < $restore_path

# Dump database into SQL file
#mysqldump --user=$user --password=$password --host=$host --port=$port $db_name > $backup_path/$db_name-$date.sql

# Delete files older than 30 days
#find $backup_path/* -mtime +30 -exec rm {} \;
