# Clock

Night time console clock.

* Large - readable at a distance without glasses
* Dim - keeps room dark
* Random position - prevents burn-in

Uses [node-canvas](https://github.com/Automattic/node-canvas) (which in turn uses [Cairo](https://www.cairographics.org/)) to create a bitmap, then uses that bitmap to print out a large ASCII clock.

## Installation

See the [node-canvas](https://github.com/Automattic/node-canvas) documentation for how to install its dependencies. For Debian or Ubuntu:

    sudo apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
