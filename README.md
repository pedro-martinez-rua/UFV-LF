UFV FoundIt – Lost & Found Network

Web application for managing lost & found items in a university context (UFV).
It consists of:

A frontend (React + Vite + TypeScript + Tailwind + shadcn/ui)

A backend (Node.js + Express)

A simple file-based storage of items in a JSON file

Optional Docker setup with Nginx reverse proxy

Table of Contents

Project Overview

Tech Stack

Features

Project Structure

Running the Project with Docker (recommended)

Running the Project without Docker (local dev)

Backend API

Data Persistence (lost-itemsjson)

Environment Variables

Common Problems & How to Fix Them

Next Steps / TODO

Project Overview

UFV FoundIt is a small lost & found network for university environments:

Students can log in, publish lost items, and browse a board of reported items.

The system provides a dashboard, profile page, messages section (UI), and an admin mode for institutional staff.

The backend exposes a small REST API and stores lost items in a JSON file (lost-items.json).

This project is intended as a learning / prototype system rather than a production-ready app, but it’s structured so you can gradually extend it (database, authentication, etc.).

Tech Stack
Frontend

React 18 + TypeScript

Vite as the build tool

Tailwind CSS

shadcn/ui + Radix UI components

React Router for client-side routing

@tanstack/react-query for data fetching / caching

lucide-react for icons

Frontend container:

Built with Node 22 → static files served by Nginx

Nginx proxies /api/* requests to the backend service

Backend

Node.js + Express

CORS enabled

Simple JSON file storage under backend/data/lost-items.json

Exposes /api/health and /api/lost-items endpoints

Backend container:

Node 22-alpine

Starts with npm start (runs src/index.js)

Orchestration

Docker Compose (v3.9)

Two services: backend and frontend

Shared bridge network ufv-foundit-net

Nginx in the frontend container proxies /api → backend:4000

Features

Welcome screen, login & register pages

Student Dashboard with quick stats and shortcuts

PostLostItem: guided flow to publish a lost object

LostBoard: listing of items (combining mock items + data from backend)

ItemDetail page

Messages UI (front only)

Profile page

Admin login & Admin panel UI (front only)

Responsive layout targeting mobile-first (works on desktop as well)

Backend data is currently anonymous and unauthenticated – any client can read/post items.

Project Structure
UFV-LF/
├─ docker-compose.yml
├─ README-docker.md              # Extra Docker notes (Spanish)
├─ backend/
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ src/
│  │  └─ index.js                # Express API + JSON storage
│  └─ data/                      # (Created at runtime) lost-items.json
└─ frontend/
   ├─ Dockerfile                 # Builds with Node, serves with Nginx
   ├─ nginx.conf                 # SPA routing + /api proxy → backend
   ├─ package.json
   ├─ index.html
   ├─ vite.config.ts             # Vite config (port 8080)
   ├─ tailwind.config.ts
   └─ src/
      ├─ App.tsx                 # Routes setup
      ├─ components/             # Shared UI & shadcn components
      └─ pages/
         ├─ Welcome.tsx
         ├─ Login.tsx
         ├─ Register.tsx
         ├─ Dashboard.tsx
         ├─ PostLostItem.tsx
         ├─ LostBoard.tsx
         ├─ ItemDetail.tsx
         ├─ Profile.tsx
         ├─ Messages.tsx
         ├─ AdminLogin.tsx
         ├─ Admin.tsx
         └─ NotFound.tsx

Running the Project with Docker (recommended)
Prerequisites

Docker and Docker Compose installed

1. Build and start the stack

From the repo root (UFV-LF/):

docker compose up --build


This will:

Build the backend image and start it on port 4000

Build the frontend image, then serve it via Nginx on port 8080

Configure Nginx so any requests to /api/* are forwarded to backend:4000

2. Access the app

Frontend: http://localhost:8080

The frontend will call the backend via /api/lost-items and /api/health transparently.

3. Stop the stack
docker compose down


Note: Without volumes, the JSON file inside the backend container is ephemeral.
If you remove the container, you lose the stored data (see Data Persistence
).

Running the Project without Docker (local dev)

You can run backend and frontend separately using Node + npm.
Recommended Node version: 18+ (Docker uses 22, but 18+ should work fine).

1. Install dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

2. Run the backend

From backend/:

npm run dev
# or
npm start


Backend will start on http://localhost:4000

It will create backend/data/lost-items.json on first write (if it doesn’t exist)

3. Run the frontend

From frontend/:

npm run dev


By default Vite will serve the app on http://localhost:8080
.

⚠️ Important: In pure local dev, the frontend calls /api/lost-items (relative path).
Since Vite does not have a proxy configured by default, /api/* will be served by Vite, not by your backend.
The simplest options are:

Use Docker for frontend (recommended) so Nginx handles the proxy, or

Add a dev proxy to vite.config.ts, e.g.:

// vite.config.ts
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  // ...
}));

Backend API

The backend is defined in backend/src/index.js.

Health check
GET /api/health


Response:

{
  "status": "ok",
  "service": "ufv-foundit-backend"
}


Useful to confirm the backend is up.

List lost items
GET /api/lost-items


Reads from data/lost-items.json

Returns an array of items, sorted by createdAt descending

Example response:

[
  {
    "id": 1,
    "title": "White AirPods Pro",
    "description": "Lost in the library",
    "category": "electronics",
    "location": "UFV Library",
    "date": "2025-11-06",
    "createdAt": "2025-11-06T12:34:56.789Z"
  }
]

Create a lost item
POST /api/lost-items
Content-Type: application/json


Body:

{
  "title": "string",
  "description": "string",
  "category": "string",
  "location": "string",
  "date": "string (e.g. 2025-11-06)"
}


All fields are required. If any is missing, backend returns:

400 Bad Request
{
  "error": "Missing required fields"
}


On success:

201 Created
{
  "id": 2,
  "title": "...",
  "description": "...",
  "category": "...",
  "location": "...",
  "date": "...",
  "createdAt": "..."
}

Data Persistence (lost-items.json)

The backend uses a JSON file as a mini “database”:

Directory: backend/data/

File: lost-items.json

Behavior:

On every request:

ensureDataFile() creates the directory and file if they don’t exist.

On GET /api/lost-items: reads and parses JSON.

On POST /api/lost-items: appends the new item and writes the file.

Important: Docker & persistence

Right now, in docker-compose.yml, the backend has no volume configured.
That means:

Data is stored inside the container filesystem (/app/data/lost-items.json).

If you run docker compose down and then docker compose up --build, the container is recreated, and the JSON file is reset.

If you want data to survive container recreation, add a volume:

services:
  backend:
    # ...
    volumes:
      - ./backend/data:/app/data


Then lost-items.json will live on your host under backend/data/ and persist across docker compose down / up.

Environment Variables
Backend

PORT (optional)

Default: 4000

Set via Docker port mapping 4000:4000.

NODE_ENV

Set to development in docker-compose.yml.

Frontend

VITE_API_BASE_URL

Set in docker-compose.yml as VITE_API_BASE_URL=http://backend:4000.

Current code uses direct /api/... calls, but this variable can be used in the future to make the API base configurable, e.g.:

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
fetch(`${API_BASE_URL}/api/lost-items`);

Common Problems & How to Fix Them
1. “Error loading lost items” / blank Lost Board

Symptoms (frontend):

Console error: Failed to load items

Toast or no items appear from backend

Possible causes & fixes:

Backend is not running

Check docker compose ps or the terminal where npm run dev is running.

Hit GET http://localhost:4000/api/health → should return { status: "ok", ... }.

Frontend is not proxying /api to backend (local dev)

If using npm run dev without Docker, configure Vite proxy (see local dev
).

Or run frontend via Docker so Nginx handles /api → backend.

CORS / network issues

In Docker, this should not happen because Nginx talks to backend via internal network.

In local dev, make sure frontend talks to http://localhost:4000 via proxy or correct URL.

2. “Error publishing your object” / toast error when posting

Symptoms (frontend):

Toast in Spanish: “Ha ocurrido un error al publicar tu objeto. Inténtalo de nuevo.”

Network tab shows POST /api/lost-items failing or returning 400/500.

Possible causes & fixes:

Missing required fields

Backend validates title, description, category, location, date.

If any is missing, you get HTTP 400 with { "error": "Missing required fields" }.

Make sure you fill in all fields in the form.

Backend unreachable

Same case as above: check /api/health and that the proxy is configured correctly.

Backend crash or JSON file error

Backend logs will show any file read/write errors.

In local dev, check you have write permission for backend/data/.

3. “Where is the data stored? Do I need to create the JSON file?”

Short answer: No, you do not need to create the JSON file manually.

The backend uses ensureDataFile():

If the data/ directory or lost-items.json file don’t exist, they are created automatically.

In Docker, this happens inside the container unless you add a volume.

In local dev, backend/data/lost-items.json will appear after your first successful POST.

If you don’t see data persisting between restarts, it’s usually because:

You are recreating the container without a volume, so internal /app/data is wiped.

To fix this, add the volume mapping mentioned above.

4. Port conflicts (8080 or 4000 already in use)

If you see errors that port 8080 or 4000 is already in use:

Stop any other service using those ports, or:

Change the host port mapping in docker-compose.yml:

services:
  backend:
    ports:
      - "4001:4000"  # host:container

  frontend:
    ports:
      - "3000:80"    # host:container


Then visit:

Frontend: http://localhost:3000

Backend: http://localhost:4001/api/health
