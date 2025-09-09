import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useCart, type CartItem } from './useCart';
import type { Artwork } from '../data/artworks';

interface Order {
  id: string; // order id
  items: CartItem[];
  createdAt: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (artwork: Artwork, size: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;

  // new for orders
  orders: Order[];
  placeOrder: () => Order; // place order and return new order
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // useCart hook se cart functionality
  const cart = useCart();
  // State to manage orders
  const [orders, setOrders] = useState<Order[]>([]);

  // Function to place an order
  const placeOrder = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart.cartItems,
      createdAt: new Date().toISOString(),
    };
    // Add new order to the orders state
    setOrders((prev) => [...prev, newOrder]);
    // Cart ko clear kar do order place karne ke baad
    cart.clearCart(); 
    return newOrder;
  };

  // Context value jo components ko provide karega
  const value: CartContextType = {
    cartItems: cart.cartItems,
    addToCart: cart.addToCart,
    removeFromCart: cart.removeFromCart,
    updateQuantity: cart.updateQuantity,
    clearCart: cart.clearCart,
    getTotalItems: cart.getTotalItems,
    getTotalPrice: cart.getTotalPrice,

    // new
    orders,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    // Agar CartProvider ke bahar use kiya gaya to error throw karega
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
