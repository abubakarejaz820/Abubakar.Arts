import { useEffect, useState } from "react";

// order ki type define kar lo — backend se jo data aata ho uske mutabiq
interface Order {
  id: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    size: string;
  }[];
  total?: number; // Added ? to make it optional, as per the suggestion
  totalPrice?: number; // Added totalPrice as an optional field
  status?: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // yahan se tum backend se orders fetch karoge
    // abhi demo data se dikha raha hoon:
    async function fetchOrders() {
      try {
        // agar backend ban gaya ho to:
        // const res = await fetch("/api/orders");
        // const data = await res.json();
        // setOrders(data.orders);

        // demo orders:
        const demoOrders: Order[] = [
          {
            id: "123",
            items: [
              { title: "Painting A", quantity: 1, price: 500, size: "M" },
              { title: "Painting B", quantity: 2, price: 300, size: "S" },
            ],
            total: 1100,
            status: "Pending",
          },
          {
            id: "456",
            items: [
              { title: "Artwork X", quantity: 1, price: 250, size: "L" },
            ],
            total: 250,
            status: "Received",
          },
        ];
        setOrders(demoOrders);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-white">
        Loading orders…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📦 Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-zinc-800 shadow rounded-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                <span className="px-3 py-1 rounded bg-amber-100 text-amber-700 dark:bg-amber-700 dark:text-white text-sm">
                  {order.status || "Pending"}
                </span>
              </div>
              <ul className="space-y-2">
                {order.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-sm border-b border-gray-200 dark:border-zinc-700 pb-1"
                  >
                    <span>
                      {/* Fixed this line as per the error message. It was already correct based on the defined type, but this makes it explicit. */}
                      {item.title} — Size: {item.size} (x{item.quantity})
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              {/* Fixed this line to handle potential missing 'total' field using nullish coalescing. */}
              <div className="mt-3 font-bold">Total: ₹{order.total ?? 0}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
