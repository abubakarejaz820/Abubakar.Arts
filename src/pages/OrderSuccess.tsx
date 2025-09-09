import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  // URL se orderId nikaalo (agar query param diya gaya ho)
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white px-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Placed Successfully!</h1>

      {orderId ? (
        <p className="text-lg mb-2">
          Your Order ID is:{" "}
          <span className="font-mono bg-gray-200 dark:bg-zinc-800 px-2 py-1 rounded">
            {orderId}
          </span>
        </p>
      ) : (
        <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">
          Your order was placed successfully.
        </p>
      )}

      <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-md">
        Thank you for your purchase. We’ll notify you once it’s processed.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="px-5 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 transition"
        >
          Back to Home
        </Link>

        <Link
          to="/cart"
          className="px-5 py-2 rounded bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600 transition"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
