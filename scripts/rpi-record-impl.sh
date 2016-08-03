#!/bin/bash

# Define passed variables
currentDevice=$1
wavFilename=$2
wavDuration=$3

echo "[Starting]     RPi recording" $currentDevice "for wav" $wavFilename
ssh pi@raspberrypi-$currentDevice.local arecord -f S16_LE -c1 -r16000 -t wav -d $wavDuration -D plughw:1 $wavFilename &
echo "[Started]      RPi recording" $currentDevice "for wav" $wavFilename
