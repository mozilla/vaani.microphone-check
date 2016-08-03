#!/bin/bash

# Define scripts directory
scripts_dir="./scripts/"

# Define passed variables
deviceCount=$1
wavFilename=$2
wavDuration=$3

# Start recording on Nascent Objects
for currentDevice in `seq 1 $deviceCount`; do
  $scripts_dir"no-record-impl.sh" $currentDevice $wavFilename $wavDuration
done
