#!/bin/bash
#
# init-project.sh
# Description:
# Project specific initialization.

# Load logger
. .gp/bash/workspace-init-logger.sh
# Load spinner
 . .gp/bash/spinner.sh

# create hello_world database
db_name=hello_world
db_exists=$(mysqlshow  2>/dev/null | grep "$db_name" >/dev/null 2>&1 && echo "1" || echo "0")
if [[ $db_exists == 0 ]]; then
  msg="Creating database: $db_name"
  log_silent "$msg" && start_spinner "$msg"
  mysql -e "CREATE DATABASE $db_name;"
  err_code=$?
  if [ $err_code != 0 ]; then
    stop_spinner $err_code
    log -e "ERROR: $msg"
  else
    stop_spinner $err_code
    log_silent "SUCCESS: $msg"
  fi
fi
# BEGIN example code block - migrate database
# . .gp/bash/spinner.sh # COMMENT: Load spinner
# __migrate_msg="Migrating database"
# log_silent "$__migrate_msg" && start_spinner "$__migrate_msg"
# php artisan migrate
# err_code=$?
# if [ $err_code != 0 ]; then
#  stop_spinner $err_code
#  log -e "ERROR: Failed to migrate database"
# else
#  stop_spinner $err_code
#  log "SUCCESS: migrated database"
# fi
# END example code block - migrate database

