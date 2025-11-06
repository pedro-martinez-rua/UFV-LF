# UFV FoundIt

UFV FoundIt is a simple **Lost & Found web application** designed for the **Universidad Francisco de Vitoria (UFV)** community.  
It helps students and staff post, search, and manage lost or found items on campus.

It includes:
- 🖥️ **Frontend:** React + Vite + TypeScript + Tailwind CSS  
- ⚙️ **Backend:** Node.js + Express + JSON file storage  
- 🐳 **Docker Support:** To run both frontend and backend easily

---

## 🚀 Quick Start (with Docker)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/UFV-LF.git
cd UFV-LF
```

### 2. Build and start the containers

```bash
docker compose up --build
```

### 3. Open the app

Visit 👉 [http://localhost:8080](http://localhost:8080)

The backend will automatically run inside Docker at port **4000**.

To stop everything:
```bash
docker compose down
```

> 🧠 Tip: If you want your data to persist between runs, add this volume in `docker-compose.yml`:
> ```yaml
> volumes:
>   - ./backend/data:/app/data
> ```

---

## 📁 Folder Structure

```
UFV-LF/
├─ backend/          → Express API + JSON data storage
│  ├─ src/index.js   → API routes (/api/lost-items, /api/health)
│  └─ data/          → Stores lost-items.json (auto-created)
├─ frontend/         → React + Vite app
│  ├─ src/pages/     → Main pages (Login, Dashboard, etc.)
│  ├─ src/components/→ Reusable UI components
│  └─ vite.config.ts → Dev configuration
└─ docker-compose.yml → Docker setup (frontend + backend)
```

---

## ⚙️ Notes & Common Issues

- **Data storage:** Saved in `backend/data/lost-items.json` (auto-created).  
- **Lost after rebuild:** Data resets if containers are rebuilt without volumes.  
- **API errors:** Make sure backend is running on port 4000.  
- **Local dev CORS:** Configure a proxy in `vite.config.ts` for `/api` → `http://localhost:4000` if needed.

---

## 🧩 Useful Commands

```bash
# Clone repo
git clone https://github.com/<your-username>/UFV-LF.git

# Run with Docker
docker compose up --build
docker compose down

# Run backend manually
cd backend && npm install && npm run dev

# Run frontend manually
cd frontend && npm install && npm run dev
```

---

## 🏁 Summary

- Frontend → [http://localhost:8080](http://localhost:8080) (Docker)  
- Backend → [http://localhost:4000/api/health](http://localhost:4000/api/health)
- Data file → `backend/data/lost-items.json`  
- All setup should work out of the box 🚀

Enjoy using UFV FoundIt!
