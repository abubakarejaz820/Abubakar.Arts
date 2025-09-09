const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory "database"
let orders = [];

// GET all orders
app.get("/api/orders", (req, res) => {
  res.json({ orders });
});

// POST new order
app.post("/api/orders", (req, res) => {
  const { items, total } = req.body;

  if (!items || !total) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const newOrder = {
    id: Date.now().toString(),
    items,
    total,
    status: "Pending",
  };

  orders.push(newOrder);

  // Normally yahan email send karte ho
  // But frontend ke liye sirf order object bhej rahe hain
  res.status(201).json({ order: newOrder });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
