
import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// SQLite adatbázis létrehozása
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Adatbázis létrehozása hiba:", err.message);
  } else {
    console.log("SQLite adatbázis létrehozva.");
  }
});

// Táblák létrehozása
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS szerszamgep (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      termek_neve TEXT NOT NULL,
      gyarto TEXT NOT NULL,
      leiras TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      age INTEGER,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    )
  `);
});

// Új termék hozzáadása
app.post("/api/add-product", (req, res) => {
  const { termek_neve, gyarto, leiras } = req.body;
  db.run(
    `INSERT INTO szerszamgep (termek_neve, gyarto, leiras) VALUES (?, ?, ?)`,
    [termek_neve, gyarto, leiras],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Termék hozzáadva!", id: this.lastID });
    }
  );
});

// **TERMÉKEK LEKÉRÉSE – CALLBACK-ALAPÚ MÓDSZER**
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM szerszamgep", [], (err, rows) => {
    if (err) {
      console.error("Lekérdezési hiba:", err);
      return res.status(500).json({ error: "Nem sikerült lekérni a termékeket." });
    }
    console.log("Lekérdezett termékek:", rows); // LOGOLÁS az ellenőrzéshez
    res.json(rows);
  });
});

// A szerver indítása
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



/*
import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// SQLite adatbázis létrehozása
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Adatbázis létrehozása hiba:", err.message);
  } else {
    console.log("SQLite adatbázis létrehozva.");
  }
});

// Táblák létrehozása
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS szerszamgep (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      termek_neve TEXT NOT NULL,
      gyarto TEXT NOT NULL,
      leiras TEXT
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      age INTEGER,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    )
  `);
});

// A szerver indítása
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

// Új termék hozzáadása
app.post("/api/add-product", (req, res) => {
    const { termek_neve, gyarto, leiras } = req.body;
    db.run(
      `INSERT INTO szerszamgep (termek_neve, gyarto, leiras) VALUES (?, ?, ?)`,
      [termek_neve, gyarto, leiras],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Termék hozzáadva!", id: this.lastID });
      }
    );
  });

 
 
  
//Backend API frissítés
app.get("/api/products", async (req, res) => {
  try {
    const products = await db.all("SELECT * FROM szerszamgep");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Nem sikerült lekérni a termékeket." });
  }
});

*/