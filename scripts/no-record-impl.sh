#!/bin/bash

# Define passed variables
currentDevice=$1
wavFilename=$2
wavDuration=$3

echo "[Starting]     Nascent Objects recording" $currentDevice "for wav" $wavFilename
ssh root@vaani-$currentDevice.local arecord -f S16_LE -c1 -r16000 -t wav -d $wavDuration -D plug:mic $wavFilename &
echo "[Started]      Nascent Objects recording" $currentDevice "for wav" $wavFilename
