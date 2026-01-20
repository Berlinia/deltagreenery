The Homebrewery (Docker Setup)

This repository provides a one-command local setup for running The Homebrewery using Docker.
You do not need to install Node.js, MongoDB, or Git on your system.

----------------------------------------------------------------

Requirements

- Docker Desktop (Windows / macOS / Linux)
- Make sure Docker Desktop is running before continuing

That’s it.

----------------------------------------------------------------

Quick Start (Recommended)

Step 1. Get the code either manually on Github, or through Git. 

Option A: Download ZIP
- Click “Code” → “Download ZIP” on GitHub
- Unzip the folder anywhere on your computer. The unzipped folder is your project root.

Option B: Git
- `git clone https://github.com/Berlinia/deltagreenery/homebrewery.git`
- `cd homebrewery`

----------------------------------------------------------------

Step 2. Start the app

From the project root (where docker-compose.yml is located):

1. Right click anywhere and click "Open in Terminal"
2. In the powershell window that opens, type: `docker compose up`.

That's it!

The first run will:
- Download Node and MongoDB Docker images
- Install dependencies
- Build Homebrewery assets
- Start the server

This may take a few minutes the first time.

----------------------------------------------------------------

Step 3. Open DeltaGreenery, a Homebrewery clone.

Open your browser and go to:

http://localhost:8001

Why port 8001?
Port 8000 is commonly used by Windows system services (WCF/IIS).
To avoid conflicts, Homebrewery is mapped to port 8001 on the host.

----------------------------------------------------------------

Stopping the app

Press Ctrl + C in the terminal, then run:

docker compose down

Your data will be preserved automatically.

----------------------------------------------------------------

Data persistence

MongoDB data is stored in a Docker volume:

deltagreenery-master_mongo_data

This means:
- Data survives restarts
- Data is not lost when containers stop

To fully reset the database, run:

docker compose down -v

WARNING: This permanently deletes all local Homebrewery data.

----------------------------------------------------------------

Useful commands

View running containers
docker compose ps

View logs
docker compose logs -f app
docker compose logs -f mongo

Rebuild everything from scratch
docker compose build --no-cache
docker compose up

----------------------------------------------------------------

Troubleshooting

If you see a Windows / WCF service page
You are likely visiting port 8000 by accident.

Make sure you are using:
http://localhost:8001

----------------------------------------------------------------

If port 8001 is unavailable

Edit docker-compose.yml and change:

ports:
  - "8001:8000"

to another free port, for example:

ports:
  - "8080:8000"

Then restart:

docker compose down
docker compose up

----------------------------------------------------------------

If the app starts but crashes

Check logs:

docker compose logs --tail=200 app

Most issues are related to MongoDB connection settings and can be fixed via environment variables.

----------------------------------------------------------------

What Docker does for you

Docker replaces all of the following manual steps:

- Installing Node.js
- Installing MongoDB
- Managing MongoDB services
- Creating data/db
- Setting PATH variables
- Running mongod
- Running npm install and npm start

Everything runs in isolated containers with pinned versions for consistency.

----------------------------------------------------------------

License

See the original Homebrewery project for licensing and attribution details.


