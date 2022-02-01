#!/bin/bash
#
# SPDX-License-Identifier: MIT
# Copyright © 2021 Apolo Pena
#
# init-gitpod.sh
# Description:
# Tasks to be run when a gitpod workspace is created for the first time.

# Load logger
. .gp/bash/workspace-init-logger.sh

# Load spinner
. .gp/bash/spinner.sh

# Let the user know there will be a wait, then begin once MySql is initialized.
start_spinner "Initializing MySql..." &&
gp await-port 3306 &&
stop_spinner $?

# BEGIN: Autogenerate php-fpm.conf
php_fpm_conf_path=".gp/conf/php-fpm/php-fpm.conf"
active_php_version="$(. .gp/bash/utils.sh php_version)"
msg="Autogenerating $php_fpm_conf_path for PHP $active_php_version"
log_silent "$msg" && start_spinner "$msg"
if bash .gp/bash/helpers.sh php_fpm_conf "$active_php_version" "$php_fpm_conf_path"; then
  stop_spinner $?
  log_silent "SUCCESS: $msg"
else
  stop_spinner $?
  log -e "ERROR: $msg"
fi
# END: Autogenerate php-fpm.conf

# BEGIN: parse .vscode/settings.json
if [[ $(bash .gp/bash/utils.sh parse_ini_value starter.ini development vscode_disable_preview_tab) == 1 ]]; then
msg="parsing .vscode/settings.json as per starter.ini"
log_silent "$msg" && start_spinner "$msg"
if bash .gp/bash/utils.sh add_file_to_file_after '{' ".gp/conf/vscode/disable_preview_tab.txt" ".vscode/settings.json"; then
  stop_spinner $?
  log_silent "SUCCESS: $msg"
else
  stop_spinner $?
  log -e "ERROR: $msg"
fi
fi
# END: parse .vscode/settings.json

  # BEGIN: Autogenerate phpinfo.php
  if [[ $(bash .gp/bash/utils.sh parse_ini_value starter.ini PHP generate_phpinfo) == 1 ]]; then
    if [[ -z $GITPOD_REPO_ROOT ]]; then 
      p="public/phpinfo.php"; 
    else
      p="$GITPOD_REPO_ROOT/public/phpinfo.php"
    fi
    msg="generating phpinfo.php file in /public "
    log_silent "$msg" && start_spinner "$msg"
    if echo "<?php phpinfo( ); ?>" > "$p"; then
      stop_spinner $?
      log_silent "SUCCESS: $msg"
    else
      stop_spinner $?
      log -e "ERROR: $msg"
    fi
  fi
  # END: Autogenerate phpinfo.php

# BEGIN: Update npm if needed
target_npm_ver='^8'
min_target_npm_ver='8.3.2'
current_npm_ver=$(npm -v)
update_npm=$(bash .gp/bash/utils.sh comp_ver_lt "$current_npm_ver" "$min_target_npm_ver")
if [[ $update_npm == 1 ]]; then
  msg="Updating npm from $current_npm_ver to"
  log_silent "$msg $target_npm_ver" && start_spinner "$msg $target_npm_ver"
  npm install -g "npm@$target_npm_ver" &>/dev/null
  err_code=$?
  if [ $err_code != 0 ]; then
    stop_spinner $err_code
    log -e "ERROR $?: $msg a version >= $min_target_npm_ver"
  else
    stop_spinner $err_code
    log_silent "SUCCESS: $msg $(npm -v)"
  fi
fi
# END: Update npm if needed

# BEGIN: init tasks
if [[ $(bash .gp/bash/helpers.sh is_inited) == 0 ]]; then
  # rsync any new project files from the docker image to the repository
  msg="rsync from ~/project-starter to $GITPOD_REPO_ROOT"
  log_silent "$msg" && start_spinner "$msg"
  shopt -s dotglob
  grc -c .gp/conf/grc/rsync-stats.conf \
  rsync -rlptgoD --ignore-existing --stats --human-readable /home/gitpod/project-starter/ "$GITPOD_REPO_ROOT"
  err_code=$?
  if [ $err_code != 0 ]; then
    stop_spinner $err_code
    log -e "ERROR: $msg"
  else
    stop_spinner $err_code
    log_silent "SUCCESS: $msg"
  fi

  # Remove potentially cached phpmyadmin installation if phpmyadmin should not be installed
  if [ "$(bash .gp/bash/utils.sh parse_ini_value starter.ini phpmyadmin install)" == 0 ]; then
    [ -d "public/phpmyadmin" ] && rm -rf public/phpmyadmin
  fi
fi
# END: init tasks
