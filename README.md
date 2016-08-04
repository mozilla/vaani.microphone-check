# Vaani Microphone Check

## Abstract 

This repo contains a suite of tools used to compare microphones used for the Vaani project.

## Introduction

Currently we are using this suite to compare the Nascent Object device microphones to other USB microphones. Generally, when comparing such microphones we will arrange a set of *n* Nascent Object devices at various distances from a sound source. Next to each such Nascent Object device we will place a Raspberry Pi connected to the other USB microphone we wish to evaluate. The general test set up is as follows:

![Image of Test Setup](https://raw.githubusercontent.com/mozilla/vaani.microphone-check/master/resources/images/TestSetUp.png)

The sound source then "reads" aloud various example sentences, apropos for the Vaani project, and the various devices, Nascent Objects and RPi's, then record the produced audio.

## Set-Up

To compare Nascent Object device microphones to other USB microphones we first prepare *n* Nascent Object devices with the host names *vaani-1*, *vaani-2*,...*vaani-n*. We then place them at specific measured distances from a sound source. (For our current tests we place *vaani-1* at 1 meter from the sound source, *vaani-2* at 2 meters from the sound source...)

Next we prepare *n* Raspberry Pi devices with the host names *raspberrypi-1*, *raspberrypi-2*,...*raspberrypi-n* each connected the USB microphone we wish to evaluate. We then place the *m*-th Raspberry Pi device next to the *m*-th Nascent Object device, as pictured above.

Next we have all the devices *vaani-1*, *vaani-2*,...*vaani-n*, *raspberrypi-1*, *raspberrypi-2*,...*raspberrypi-n* join the same WiFi network. This allows us, from this WiFi network, to login to *vaani-1* using the hostname *vaani-1.local*, to *vaani-2* using the hostname *vaani-2.local*,..., and to *raspberrypi-n* using the hostname *raspberrypi-n.local*.

Next we clone this repository onto a computer connected to the sound source and on the same WiFi network as all of the devices. (We have only tested this with OS X.) This computer must then be configured to ssh into all devices without using a password. (This process is described here[[1]](http://www.linuxproblem.org/art_9.html).)

The final configuration step that must occur is adjusting the audio level of the sound source such that its volume emulates that of conversational speech. To do so one first requires a dB meter. (We used Decibel 10th[[2]](https://itunes.apple.com/us/app/decibel-10th-professional/id448155923?mt=8)) One then palces the dB meter at a distance of 1m from the sound source, plays any of the audio files in `resources/audio`, and then adjusts the volume of the sound source such that the audio files are 65 dB at 1m from the sound source. (65dB at 1m is an approximation of conversational speech[[3]](http://www.hearnet.com/at_risk/risk_trivia.shtml)).

## Execution

Once on has completed all of the set-up steps, execution of the code is straight-forward. One `cd`'s into the `vaani.microphone-check` directory. Then one calls `./microphone-check` as follows
```
kdaviss-MacBook-Pro:vaani.microphone-check kdavis$ ./microphone-check <n>
```
where `<n>` is replaced with the number of Nascent Object devices.

Upon completetion, the recordings from the various devices will be placed in the `results` directory. For the `n=3` case the results will appear as follows
```
results/
├── no
│   ├── device-1
│   │   ├── add_anemone_nemorosas_to_my_list.wav
|   |   |   ...
│   │   ├── add_anemone_tetonensis_to_my_list_please.wav
│   │   └── can_you_please_add_on_pilsners_to_my_list.wav
│   ├── device-2
│   │   ├── add_anemone_nemorosas_to_my_list.wav
│   │   ├── add_anemone_tetonensis_to_my_list_please.wav
|   |   |   ...
│   │   └── can_you_please_add_on_pilsners_to_my_list.wav
│   └── device-3
│       ├── add_anemone_nemorosas_to_my_list.wav
│       ├── add_anemone_tetonensis_to_my_list_please.wav
|       |   ...
│       └── can_you_please_add_on_pilsners_to_my_list.wav
└── rpi
    ├── device-1
    │   ├── add_anemone_nemorosas_to_my_list.wav
    │   ├── add_anemone_tetonensis_to_my_list_please.wav
    |   |   ...
    │   └── can_you_please_add_on_pilsners_to_my_list.wav
    ├── device-2
    │   ├── add_anemone_nemorosas_to_my_list.wav
    │   ├── add_anemone_tetonensis_to_my_list_please.wav
    |   |   ...
    │   └── can_you_please_add_on_pilsners_to_my_list.wav
    └── device-3
        ├── add_anemone_nemorosas_to_my_list.wav
        ├── add_anemone_tetonensis_to_my_list_please.wav
        |   ...
        └── can_you_please_add_on_pilsners_to_my_list.wav
```
where the `rpi` directory contains the Raspberry Pi results and the `no` directory the Nascent Object results.
