#!/bin/bash

# Define scripts directory
scripts_dir="./scripts/"

# Define passed variables
deviceCount=$1
wavFilename=$2
wavDuration=$3

# Start recording on RPi's 
for currentDevice in `seq 1 $deviceCount`; do
  $scripts_dir"rpi-record-impl.sh" $currentDevice $wavFilename $wavDuration
done
