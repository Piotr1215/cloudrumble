#!/usr/bin/env bash

set -e

# Runs dev loop if 'run' parameter is passed
if [ "$1" = "run" ]; then
	mprocs "npm run start"
fi
