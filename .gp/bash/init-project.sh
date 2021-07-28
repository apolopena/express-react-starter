#!/bin/bash
#
# init-project.sh
# Description:
# Project specific initialization.

c_red='\e[38;5;124m'
c_blue='\e[38;5;147m'
c_end='\e[0m'
s=$(basename "$0")

[[ $(pwd) != $GITPOD_REPO_ROOT ]] &&
echo -e "$c_red""ERROR: $c_end$c_blue$s$c_end$c_red can only be run from the project root$c_end" &&
exit 1

# Load logger and spinner
. .gp/bash/workspace-init-logger.sh
. .gp/bash/spinner.sh

install_deps() {
  local target msg err_code
  target="$1"
  if [[ ! -d $target/node_modules ]]; then
    msg="Installing dependecies in ./$target"
    log_silent "$msg" && start_spinner "$msg"
    if  yarn --cwd "$target" install  --silent 2> >(grep -v warning 1>&2) > /dev/null 2>&1; then
      err_code=$?
      if [ $err_code != 0 ]; then
        stop_spinner $err_code
        log -e "ERROR: $msg"
      else
        stop_spinner $err_code
        log_silent "SUCCESS: $msg"
      fi
    fi
  else
    log "WARNING: ./$target dependencies exist, installation skipped."
  fi
  return 0
}

# Init server
install_deps "server"
# Init client
install_deps "client"
if [[ ! -d client/build ]]; then
  msg="Building production version of: ./client"
  log "$msg" && yarn --cwd ./client run build
  if [[ $? -ne 0 ]]; then
    log_silent -e "ERROR: $msg"
  else
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

