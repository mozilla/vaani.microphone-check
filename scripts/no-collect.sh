#!/bin/bash

# Define home directory
home_dir="/home/root/"

# Define passed variables
deviceCount=$1
wavFilename=$2

# Start collect on Nascent Objects
for currentDevice in `seq 1 $deviceCount`; do
  target_dir=results/rpi/device-$currentDevice/
  if [ ! -d "$target_dir" ]; then
    mkdir -p $target_dir
  fi
  scp root@vaani-$currentDevice.local:$home_dir$wavFilename $target_dir
  ssh root@vaani-$currentDevice.local rm -fr $home_dir$wavFilename 
done
