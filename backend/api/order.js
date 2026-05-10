let orders = [];

export default function orderHandler(req, res) {
  // Allow CORS for Netlify
  res.setHeader("Access-Control-Allow-Origin", "https://abubakar-arts.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Preflight
    return res.status(200).end();
  }

  if (req.method === "GET") {
    res.status(200).json({ orders });
  } else if (req.method === "POST") {
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
