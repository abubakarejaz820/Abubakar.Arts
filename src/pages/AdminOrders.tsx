import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
          "https://new-backend-beta.vercel.app/api/order"
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-amber-50 to-zinc-100 text-gray-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white">
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-lg font-medium shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          Loading orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-amber-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="rounded-2xl border border-red-300 bg-red-50 px-6 py-4 text-red-600 shadow-md dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50 to-zinc-100 px-4 py-8 text-gray-900 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-600 dark:text-amber-400">Orders</p>
            <h1 className="mt-2 text-3xl font-bold">Admin Orders</h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin"
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:border-amber-500 hover:text-amber-700 dark:border-zinc-700 dark:hover:border-amber-400 dark:hover:text-amber-400"
            >
              Back to Admin
            </Link>
            <a
              href="/"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-amber-600 dark:hover:bg-amber-500"
            >
              Open Website
            </a>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            No orders yet.
          </div>
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
                  className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700 dark:bg-amber-700 dark:text-white">
                      {order.status || "Pending"}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between gap-3 border-b border-zinc-200 pb-2 text-sm dark:border-zinc-700"
                      >
                        <span>
                          {item.title} - Size: {item.size} (x{item.quantity})
                        </span>
                        <span className="font-medium">Rs. {item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-lg font-bold text-amber-700 dark:text-amber-400">Total: Rs. {orderTotal}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
