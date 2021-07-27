#!/bin/bash
# mysql.sh
# A simple script to start up the mysql database
e="ERROR:"
up="$(pgrep mysqld | wc -l)"

[[ "$(id -u)" -ne 0 ]] && echo "$e script must be run with sudo" && exit 1
if [[ $1 == 'start' ]]; then
  [[ $up != "0" ]] && echo "$e mysql already running, nothing to start" && exit 1
  service mysql start && echo "mysqld started" && exit
fi
if [[ $1 == 'stop' ]]; then
  [[ $up == "0" ]] && echo "$e mysql not running, nothing to stop" && exit 1
  service mysql stop && echo "mysqld stopped" && exit
fi
echo "$e either give a start or a stop command"
exit 1