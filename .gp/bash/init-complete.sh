#!/bin/bash
# shellcheck disable=SC2181
#
# SPDX-License-Identifier: MIT
# Copyright © 2021 Apolo Pena
#
# init-complete.sh
# Description:
# Code to be run just once at the very end of workspace initialization.
# 
# Notes:
# Always call this file last from the 'init' command in .gitpod.yml

parse="bash .gp/bash/utils.sh parse_ini_value starter.ini"

# Load logger
. .gp/bash/workspace-init-logger.sh

# Cleanup
if rm -rf /home/gitpod/project-starter;then
  log "CLEANUP SUCCESS: removed ~/project-starter"
fi

# Run unit tests if directed to do so
if [[ $(eval "$parse" development run_unit_tests_on_init) == yes ]]; then
  log "Running integration tests" && sleep 2 && yarn --cwd ./server run -s unit_test
  if [[ $? -ne 0 ]]; then
    log_silent -e "ERROR: Some unit tests failed"
  else
    log_silent "SUCCESS: All unit tests passed"
  fi
  sleep 2
fi

# Run integration tests if directed to do so
if [[ $(eval "$parse" development run_integration_tests_on_init) == yes ]]; then
  log "Running integration tests" && sleep 2 && yarn --cwd ./server run -s integration_test
  if [[ $? -ne 0 ]]; then
    log_silent -e "ERROR: Some integration tests failed"
  else
    log_silent "SUCCESS: All integration tests passed"
  fi
  sleep 2
fi

# Summarize results
bash .gp/bash/helpers.sh show_first_run_summary

# Special notes
echo -e "\nYou can now start the express server and view the client by running:" 
echo -e "\e[38;5;76m  cd server && yarn run start\e[0m\n"

# Persist the workspace-init.log since the .gitpod.Dockerfile will wipe it out and it wont come back after the first run
bash .gp/bash/helpers.sh persist_file /var/log/workspace-init.log

# Set initialized flag - Keep this at the bottom of the file
bash .gp/bash/helpers.sh mark_as_inited
gp sync-done gitpod-inited
