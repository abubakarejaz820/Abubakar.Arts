import type { ReactElement } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedArtworks } from './components/FeaturedArtworks';
import { Catalog } from './components/Catalog';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Cart } from './components/Cart';
import { CartProvider } from './hooks/CartContext';
import Gallery from './components/Gallery';

// ✅ import pages
import OrderSuccess from './pages/OrderSuccess';
import AdminOrders from './pages/AdminOrders';

export const App = (): ReactElement => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // function to pass to Catalog so Buy Now opens cart
  const openCart = () => setIsCartOpen(true);

  return (
    <CartProvider>
      <Router>
        <div className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 relative">
          {/* Header receives onCartClick */}
          <Header onCartClick={openCart} />

          <main>
            <Routes>
              {/* Home page */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <FeaturedArtworks />
                    {/* Pass openCart to Catalog */}
                    <Catalog openCart={openCart} />
                    <About />
                    <Gallery />
                    <Contact />
                  </>
                }
              />

              {/* Optional route for cart */}
              <Route path="/cart" element={<Cart onClose={() => setIsCartOpen(false)} />} />

              {/* Order Success page */}
              <Route path="/order-success" element={<OrderSuccess />} />

              {/* Admin Orders page */}
              <Route path="/admin-orders" element={<AdminOrders />} />
            </Routes>
          </main>

          <Footer />

          {/* Cart Modal */}
          {isCartOpen && (
            <div className="fixed inset-0 z-50 flex">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setIsCartOpen(false)}
              />

              {/* Sidebar */}
              <div
                className="relative ml-auto w-full max-w-md h-full bg-white dark:bg-zinc-900 shadow-xl overflow-y-auto transform transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Cart onClose={() => setIsCartOpen(false)} />
              </div>
            </div>
          )}
        </div>
      </Router>
    </CartProvider>
  );
};
