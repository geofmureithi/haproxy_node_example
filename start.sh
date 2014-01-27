#! /usr/bin/env bash

. ./stop.sh

node index.js --port=8001 && node index.js --port=8002 && node index.js --port=8003 && node index.js --port=8004 && sudo haproxy -f ./haproxy.cfg
