import { useState, useCallback } from 'react';
import { artworks, categories } from '../data/artworks';
import { useCartContext } from '../hooks/CartContext';
import type { Artwork } from '../data/artworks';
import { formatPrice } from '../utils/formatPrice';
import { AnimatePresence, motion } from 'framer-motion';

interface CatalogProps {
  openCart: () => void; // function to open cart modal
}

export const Catalog = ({ openCart }: CatalogProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartAnimate, setCartAnimate] = useState<Record<string, boolean>>({});
  const { addToCart } = useCartContext();

  const filteredArtworks = artworks.filter(
    (artwork) => activeCategory === 'All' || artwork.category === activeCategory
  );

  const handleAddToCart = useCallback(
    (artwork: Artwork) => {
      const size = artwork.sizes[0]; // default size
      addToCart(artwork, size);

      // Animate button feedback
      setCartAnimate((prev) => ({ ...prev, [artwork.id]: true }));
      setTimeout(() => {
        setCartAnimate((prev) => ({ ...prev, [artwork.id]: false }));
      }, 1000);
    },
    [addToCart]
  );

  // Buy now directly adds to cart and opens the cart modal
  const handleBuyNow = (artwork: Artwork) => {
    const size = artwork.sizes[0];
    addToCart(artwork, size);

    // Open cart modal for checkout
    openCart();

    // Animate button feedback
    setCartAnimate((prev) => ({ ...prev, [artwork.id]: true }));
    setTimeout(() => {
      setCartAnimate((prev) => ({ ...prev, [artwork.id]: false }));
    }, 1000);
  };

  return (
    <section
      className="bg-gradient-to-b from-white to-amber-50 dark:from-zinc-950 dark:to-zinc-900 py-20 sm:py-28"
      id="catalog"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Our Full Collection
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Discover unique pieces to elevate your space.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                  : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Artworks Grid */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group relative rounded-3xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 bg-white/80 dark:bg-zinc-800/70 backdrop-blur-md border border-amber-200 dark:border-amber-600"
            >
              {/* Image */}
              <div className="w-full h-80 overflow-hidden rounded-t-3xl relative">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 bg-amber-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                  {artwork.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                  {artwork.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {artwork.artist}
                </p>
                <p className="mt-3 text-lg font-bold text-amber-600 dark:text-amber-500">
                  {formatPrice(artwork.price)}
                </p>
                <div className="flex gap-2 mt-5 w-full">
                  {/* Add to cart button */}
                  <button
                    onClick={() => handleAddToCart(artwork)}
                    className={`flex-1 py-2 rounded-md font-semibold shadow-lg transition-all duration-300 relative overflow-hidden ${
                      cartAnimate[artwork.id]
                        ? 'bg-green-500 hover:scale-100'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:scale-105'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {cartAnimate[artwork.id] ? (
                        <motion.span
                          key="added"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-center gap-2 text-white"
                        >
                          ✓ Added
                        </motion.span>
                      ) : (
                        <motion.span
                          key="cart"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-center gap-2 text-white"
                        >
                          Add to Cart
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  {/* Buy now button */}
                  <button
                    onClick={() => handleBuyNow(artwork)}
                    className="flex-1 py-2 rounded-md font-semibold shadow-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Full-card success animation */}
              <AnimatePresence>
                {cartAnimate[artwork.id] && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute inset-0 bg-green-500/80 backdrop-blur-sm flex items-center justify-center rounded-3xl text-white text-3xl font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
