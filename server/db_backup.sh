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
db_name=$DATABASE_NAME

# Other options
backup_path="$HOME/studio_backup/mysql"
date=$(date +"%d-%b-%Y")

# Set default file permissions
umask 177

# Dump database into SQL file
mysqldump --user=$user --password=$password --host=$host --port=$port $db_name > $backup_path/$db_name-$date.sql

# Delete files older than 30 days
find $backup_path/* -mtime +30 -exec rm {} \;
