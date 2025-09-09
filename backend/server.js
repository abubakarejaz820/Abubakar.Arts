const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Port dynamically for Vercel, fallback to 5000 for local
const PORT = process.env.PORT || 5000;

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
  const { items, total, customer_name, customer_email, customer_phone, customer_city } = req.body;

  if (!items || !total) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  const newOrder = {
    id: Date.now().toString(),
    items,
    total,
    status: "Pending",
    customer_name,
    customer_email,
    customer_phone,
    customer_city,
  };

  orders.push(newOrder);
  res.status(201).json({ order: newOrder });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
