import express from "express";
import ejs from "ejs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import env from "dotenv";
import session from "express-session";
import pgSession from "connect-pg-simple"; // Re-import pgSession

const { Client } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

env.config();

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  user: process.env.PG_USER || "default_user",
  host: process.env.PG_HOST || "127.0.0.1", // Use IPv4 address explicitly
  database: process.env.PG_DB || "default_db",
  password: process.env.PG_PASSWORD || "default_password",
  port: process.env.PG_PORT || 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
});

// Force IPv4 resolution
client.on("connect", () => {
  console.log("Connected to the database using IPv4.");
});

client.connect().catch((err) => console.error("DB Connection Error:", err));

app.use(
  session({
    store: new (pgSession(session))({
      pool: client, // Reuse the existing pg client
    }),
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images"))); // Serve images from the images folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

let currentData = [];
let totalSum = 0; // Add a global variable to store totalSum

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM first_aid_products");
    const firstAidKit = result.rows.map((row) => ({
      itemNumber: row.item_number,
      name: row.product_name, // Updated column name
      price: row.price,
      quantity: row.quantity,
    }));

    const mergedData = firstAidKit.map((item) => {
      const updatedItem = currentData.find(
        (data) => data.itemNumber === item.itemNumber
      );
      return updatedItem ? { ...item, quantity: updatedItem.quantity } : item;
    });

    res.render("index.ejs", { firstAidKit: mergedData, currentData });
  } catch (err) {
    console.error("Error querying database:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/update", (req, res) => {
  res.render("update.ejs", { data: currentData, totalSum });
});

app.get("/price", (req, res) => {
  res.render("price.ejs", { data: currentData });
});

app.post("/update-count", (req, res) => {
  const { quantity, name, itemNumber, price } = req.body;

  const existingItemIndex = currentData.findIndex(
    (data) => data.itemNumber === itemNumber
  );
  if (existingItemIndex !== -1) {
    currentData[existingItemIndex].quantity = quantity;
    currentData[existingItemIndex].price = price;
  } else {
    currentData.push({ quantity, name, itemNumber, price });
  }

  // Recalculate totalSum
  totalSum = currentData.reduce(
    (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity, 10),
    0
  );

  console.log("Updated data received:", req.body);
  res.json({ message: `Data updated: ${JSON.stringify(req.body)}` });
});

app.post("/update-total", (req, res) => {
  totalSum = parseFloat(req.body.totalSum) || 0;
  console.log("Total sum updated:", totalSum);
  res.json({ message: "Total sum updated successfully." });
});

app.post("/clear-all", (req, res) => {
  currentData = [];
  console.log("All data cleared.");
  res.json({ message: "All data cleared." });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
