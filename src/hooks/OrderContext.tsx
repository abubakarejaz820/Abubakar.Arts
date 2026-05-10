import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from './useCart';

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'received';
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], totalPrice: number) => Order;
  markOrderReceived: (orderId: string) => void;
  getPendingOrders: () => Order[];
  getReceivedOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // add new order (user checkout)
  const addOrder = (items: CartItem[], totalPrice: number): Order => {
    const newOrder: Order = {
      id: `${Date.now()}`, // unique id
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // admin marks order as received
  const markOrderReceived = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: 'received' } : order
      )
    );
  };

  // helpers for filtering
  const getPendingOrders = () => orders.filter((o) => o.status === 'pending');
  const getReceivedOrders = () => orders.filter((o) => o.status === 'received');

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, markOrderReceived, getPendingOrders, getReceivedOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};
