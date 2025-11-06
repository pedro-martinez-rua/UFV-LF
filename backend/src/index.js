const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;

// Simple JSON file-based storage for lost items
const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "lost-items.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

function readItems() {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading data file:", err);
    return [];
  }
}

function writeItems(items) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
  } catch (err) {
    console.error("Error writing data file:", err);
  }
}

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "ufv-foundit-backend" });
});


app.get("/api/lost-items", (req, res) => {
  const items = readItems();

  // Return newest first
  items.sort((a, b) => {
    const aDate = new Date(a.createdAt || 0).getTime();
    const bDate = new Date(b.createdAt || 0).getTime();
    return bDate - aDate;
  });

  res.json(items);
});

app.post("/api/lost-items", (req, res) => {
  const { title, description, category, location, date } = req.body;

  if (!title || !description || !category || !location || !date) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  const items = readItems();

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    title,
    description,
    category,
    location,
    date,
    createdAt: new Date().toISOString(),
  };

  items.push(newItem);
  writeItems(items);

  res.status(201).json(newItem);
});

// TODO: aquí podrás añadir tus endpoints REST y conectar tu base de datos.

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
