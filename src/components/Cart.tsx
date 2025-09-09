import { useCallback, useState } from 'react';
import { useCartContext } from '../hooks/CartContext';
import { formatPrice } from '../utils/formatPrice';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  onClose?: () => void;
}

export const Cart = ({ onClose }: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartContext();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const navigate = useNavigate();

  // Clear Cart
  const handleClearCart = useCallback(() => setShowConfirmation(true), []);
  const confirmClearCart = useCallback(() => { clearCart(); setShowConfirmation(false); }, [clearCart]);
  const cancelClearCart = useCallback(() => setShowConfirmation(false), []);

  // Checkout
  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !customerPhone || !customerCity) {
      setCheckoutMessage('Please fill in all your details before checkout.');
      return;
    }

    if (cartItems.length === 0) {
      setCheckoutMessage('Your cart is empty.');
      return;
    }

    try {
      // ✅ Correct backend endpoint for Vercel
      const response = await fetch('https://new-backend-beta.vercel.app/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            title: item.artwork.title,
            quantity: item.quantity,
            price: item.artwork.price,
            size: item.size,
          })),
          total: getTotalPrice(),
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          customer_city: customerCity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Backend error:', data);
        throw new Error(data.message || 'Failed to create order');
      }

      const order = data.order;
      if (!order?.id) throw new Error('Order ID missing from backend response');

      // Send Email to admin
      try {
        await emailjs.send(
          'service_lll8dag',
          'template_ptk39hf',
          {
            order_id: order.id,
            cart_items: order.items.map((i: any) => `${i.title} (Qty: ${i.quantity})`).join('\n'),
            total_price: formatPrice(order.total),
            admin_email: 'admin@example.com',
            customer_name: customerName,
            customer_email: customerEmail,
            customer_phone: customerPhone,
            customer_city: customerCity,
          },
          'T0ZCgC2PqopCvHbEM'
        );
      } catch (emailError) {
        console.error('EmailJS error:', emailError);
      }

      // Clear cart
      clearCart();

      // Redirect to order success page
      navigate(`/order-success?orderId=${order.id}`);
    } catch (error: any) {
      console.error('Checkout error:', error);
      setCheckoutMessage(error.message || 'Checkout failed. Please try again.');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-zinc-900">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-gray-300 dark:border-zinc-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-xl font-bold transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Customer Details */}
      <div className="p-6 border-b border-gray-300 dark:border-zinc-700 space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        />
        <input
          type="text"
          placeholder="Address"
          value={customerCity}
          onChange={(e) => setCustomerCity(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
        />
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600 dark:text-gray-400">
            <p className="mt-4 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-300 dark:border-zinc-700">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {cartItems.map((item) => (
                <tr key={item.id} className="bg-white dark:bg-zinc-900">
                  <td className="px-4 py-2 whitespace-nowrap flex items-center space-x-3">
                    <div className="w-16 h-16 overflow-hidden rounded-md">
                      <img
                        className="w-full h-full object-cover"
                        src={item.artwork.imageUrl}
                        alt={item.artwork.title}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.artwork.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Size: {item.size}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                    {formatPrice(item.artwork.price)}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 rounded-md bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 rounded-md bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 transition"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                    {formatPrice(item.artwork.price * item.quantity)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-6 border-t border-gray-300 dark:border-zinc-700 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            Total: {formatPrice(getTotalPrice())}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleClearCart}
              className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 text-white bg-amber-600 rounded-md hover:bg-amber-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg text-center w-80">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Are you sure you want to clear your cart?
            </h3>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={confirmClearCart}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelClearCart}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Message */}
      {checkoutMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between">
          <span>{checkoutMessage}</span>
          <button
            onClick={() => setCheckoutMessage(null)}
            className="ml-4 font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
