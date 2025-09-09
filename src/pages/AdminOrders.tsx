import { useEffect, useState } from "react";

// Backend data type
interface Order {
  id: string;
  items: {
    title: string;
    quantity: number;
    price: number;
    size: string;
  }[];
  total?: number;
  status?: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        // ✅ Fixed: Use Vercel backend endpoint
        const res = await fetch(
          "https://new-backend-jet.vercel.app/api/order"
        );

        if (!res.ok) {
          const text = await res.text();
          console.error("Backend error response:", text);
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        // Ensure data.order exists
        if (!data.order && !Array.isArray(data.order)) throw new Error("Invalid data format from backend");

        // Vercel backend may return a single object or array
        const ordersArray = Array.isArray(data.order) ? data.order : [data.order];
        setOrders(ordersArray);
      } catch (err: any) {
        console.error("Fetch orders error:", err);
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
          {orders.map((order) => {
            // Calculate total if backend didn't provide
            const orderTotal =
              order.total ??
              order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

            return (
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
                        {item.title} — Size: {item.size} (x{item.quantity})
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 font-bold">Total: ₹{orderTotal}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
