#!/bin/sh
if [[ -z "${BOT_TOKEN}" || -z "${BOT_CLIENTID}" ]]; then
    echo "BOT_TOKEN or BOT_CLIENTID Env vars are missing"
    exit 1
fi
node deploy-commands.js
node App.js