Delta Greenery

This repository is a fork of [the Homebrewery](https://homebrewery.naturalcrit.com/) by the wonderful folks at Natural Crit, adapted to produce documents for [Arc Dreams' Delta Green](https://arcdream.com/home/category/delta-green/) Roleplaying Game. The goal is to be able to produce semi-authentic looking pdf's that emulate the style of the official Delta Green material, for purposes such as adventure creation and thus empower homebrew creations for its users. For a preview see here:

<img width="2527" height="1207" alt="image" src="https://github.com/user-attachments/assets/c30e49dd-ea1e-4639-920a-ad39ee2c6dba" />


----------------------------------------------------------------
**Installation Guide for Windows**
First ensure you have the following dependencies installed.

- WSL with a Linux Distribution. [How to Guide](https://learn.microsoft.com/en-us/windows/wsl/install)
- Install [Git](https://git-scm.com/install/). 
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows / macOS / Linux) for your computer, and log in. You can make an account, or use google/github.
- Make sure Docker Desktop is running, and you are logged into it, before continuing.

Now run the following file:

``run-deltagreenery.bat`` 

in a folder of your choosing, which can be found in [here](https://github.com/Berlinia/deltagreenery/releases/download/try/run-deltagreenery.bat) or in the releases tab.

and you are done! You are currently localy hosting a version of homebrewery. Go to your browser and type:

``http://localhost:8000/``

and play around. Every time you re-run the above `.bat` file, your local version of the deltagreenery syncs with the repository on github, so you can enjoy the latest features.

**Installation Guide for Linux**
The above ``.bat`` file essentially runs two commands:

``git pull https://github.com/Berlinia/deltagreenery``
and 
``docker compose up``

The rest of the installation is handled by docker (which essentially just installs Node in a container, and runs it, as well as link the Mongo database). 
So on Linux/macOS just run the above commands in a terminal, in the directory you want delta-greenery installed on.

**Common Issues**
1. If you can't install WSL, uninstall and re-install Microsoft Store.
2. Make sure all is good.


Special thanks to discord user TFA303 for helping me test things.













