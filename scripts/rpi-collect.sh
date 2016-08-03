#!/bin/bash

# Define home directory
home_dir="/home/pi/"

# Define passed variables
deviceCount=$1
wavFilename=$2

# Start collect on RPi 
for currentDevice in `seq 1 $deviceCount`; do
  target_dir=results/rpi/device-$currentDevice/
  if [ ! -d "$target_dir" ]; then
    mkdir -p $target_dir
  fi
  scp pi@raspberrypi-$currentDevice.local:$home_dir$wavFilename $target_dir
  ssh pi@raspberrypi-$currentDevice.local rm -fr $home_dir$wavFilename 
done
