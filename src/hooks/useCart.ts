import { useState, useCallback } from 'react';
import type { Artwork } from '../data/artworks';

export interface CartItem {
  id: string; // unique per artwork & size
  artwork: Artwork;
  size: string;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // add item to cart or increase its quantity
  const addToCart = useCallback(
    (artwork: Artwork, size: string, quantity: number = 1) => {
      const itemId = `${artwork.id}-${size}`;

      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === itemId);

        if (existingItem) {
          // increase quantity of existing item
          return prev.map((item) =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        // add new item
        return [...prev, { id: itemId, artwork, size, quantity }];
      });
    },
    []
  );

  // remove a cart item
  const removeFromCart = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  // update quantity (if zero, remove)
  const updateQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  // clear entire cart
  const clearCart = useCallback(() => setCartItems([]), []);

  // get total items count
  const getTotalItems = useCallback(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  // get total price
  const getTotalPrice = useCallback(
    () =>
      cartItems.reduce(
        (total, item) => total + item.artwork.price * item.quantity,
        0
      ),
    [cartItems]
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
};
