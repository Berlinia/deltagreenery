Delta Greenery

## Delta Green rights and publishing license

Delta Green is a trademark and copyright of the **Delta Green Partnership**. Read the [official publishing guidelines](https://www.delta-green.com/publishing-guidelines/) before distributing your work. The guidelines govern use of Delta Green intellectual property; the repository's source-code license does not grant rights to that property.

Use **License > Delta Green > Recognition of Rights (first page)** in either renderer to insert the required notice. Replace `[AUTHOR NAME]` with your author name and place it on the **first page** of a PDF or text publication. The notice is also required on each applicable web page; the official guidelines explain placement for audio and video. The automatic Arc Dream Publishing disclaimer is separate and does not replace this notice.

> Published by arrangement with the Delta Green Partnership. The intellectual property known as Delta Green is a trademark and copyright owned by the Delta Green Partnership, who has licensed its use here. The contents of this document are ©[AUTHOR NAME], excepting those elements that are components of the Delta Green intellectual property.

**License > Delta Green > Publishing Guidelines** inserts a link and a summary. Noncommercial material must be free to access; paid subscriptions, fundraising, sales and pay-what-you-want distribution are not permitted under the general permission. Commercial use requires separate written permission. Do not use the official logo or official trade dress, and follow the guidelines' title rules.

The guidelines exclude AI-created material, republications, translations, original fiction, and apps or other executables. They describe allowed original game material and actual plays, with a limited commercial exception for subscriber-funded actual-play and discussion podcasts. Consult the linked policy for the complete conditions: adding the notice is not, by itself, permission for an otherwise excluded use.

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
If it finds the git directory it runs first:
``git pull https://github.com/Berlinia/deltagreenery``

If it does not, it creates a folder called deltagreenery, in the directory you executed the bat file in.

``git clone https://github.com/Berlinia/deltagreenery``

Then it runs 
``docker compose up``

The rest of the installation is handled by docker (which essentially just installs Node in a container, and runs it, as well as link the Mongo database). 
So on Linux/macOS just run the above commands in a terminal, in the directory you want delta-greenery installed on.

**Common Issues**
1. If you can't install WSL, uninstall and re-install Microsoft Store.
2. Make sure all is good.


Special thanks to discord user TFA303 for helping me test things.

Published by arrangement with the Delta Green Partnership. The intellectual property known as Delta Green is a trademark and copyright owned by the Delta Green Partnership, who has licensed its use here. The contents of this document are ©Berlinia's, excepting those elements that are components of the Delta Green intellectual property.











