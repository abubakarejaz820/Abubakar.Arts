// src/components/FeaturedArtworks.jsx
import { useState } from 'react';
import { artworks } from '../data/artworks';
import { formatPrice } from '../utils/formatPrice';
import { AnimatePresence, motion } from 'framer-motion';
// 1. Import the CartContext
import { useCartContext } from '../hooks/CartContext';

export const FeaturedArtworks = () => {
  const featuredArtworks = artworks.filter(artwork => artwork.featured);
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  // 2. Add state for the selected size
  const [selectedSize, setSelectedSize] = useState('');
  // 3. Use the CartContext to get the addToCart function
  const { addToCart } = useCartContext();

  const openModal = (artwork: typeof artworks[0]) => {
    setSelectedArtwork(artwork);
    // 4. Set the default size when the modal opens
    setSelectedSize(artwork.sizes[0]);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    document.body.style.overflow = 'unset';
  };

  // 5. Update the handleAddToCart function
  const handleAddToCart = () => {
    if (!selectedArtwork || !selectedSize) {
      console.error("Error: Artwork or size not selected.");
      return;
    }

    // 6. Call the addToCart function from the context
    addToCart(selectedArtwork, selectedSize);

    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    closeModal();
  };

  return (
    <section className="bg-gradient-to-br from-white via-amber-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-900 py-20 sm:py-32" id="featured-art">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-lg">
            🌟 Featured Artworks
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Hand-picked selections of our most celebrated pieces. Discover the beauty of Islamic calligraphy in modern style.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredArtworks.map(artwork => (
            <motion.div
              key={artwork.id}
              className="group relative rounded-3xl overflow-hidden shadow-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border border-amber-200 dark:border-amber-900 transition-transform duration-300 hover:scale-105 cursor-pointer hover:border-amber-500 hover:shadow-amber-200 dark:hover:shadow-amber-900"
              onClick={() => openModal(artwork)}
              tabIndex={0}
              aria-label={`View details for ${artwork.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 pointer-events-none z-0 group-hover:animate-pulse group-hover:shadow-[0_0_40px_10px_rgba(255,193,7,0.25)]"></div>
              <div className="w-full h-60 sm:h-72 overflow-hidden relative">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-3xl"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg drop-shadow-lg">
                  Featured
                </span>
              </div>
              <div className="p-4 sm:p-6 bg-white/90 dark:bg-zinc-900/90 rounded-b-3xl flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                  {artwork.title}
                </h3>
                <p className="text-base text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  {artwork.artist}
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-amber-600 dark:text-amber-400 mb-4 drop-shadow">
                  {formatPrice(artwork.price)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(artwork);
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-400 dark:hover:shadow-amber-900"
                  tabIndex={-1}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-white via-amber-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border-4 border-amber-500 dark:border-amber-800"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-gray-600 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 text-3xl font-bold bg-white/60 dark:bg-zinc-900/60 rounded-full p-2 shadow-lg transition-colors duration-200 z-10"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="md:flex">
                <div className="md:w-1/2 flex items-center justify-center bg-gradient-to-br from-amber-100 via-white to-amber-50 dark:from-amber-900 dark:via-zinc-900 dark:to-amber-950 p-4 sm:p-8">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-56 sm:h-80 object-cover rounded-2xl shadow-xl"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 sm:p-8 md:w-1/2 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 drop-shadow-lg">
                    {selectedArtwork.title}
                  </h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 font-medium">{selectedArtwork.artist}</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4 drop-shadow">
                    {formatPrice(selectedArtwork.price)}
                  </p>
                  <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {selectedArtwork.description}
                  </p>
                  {/* 7. Add a size selection dropdown */}
                  <div className="mb-6">
                    <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Size
                    </label>
                    <select
                      id="size-select"
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full py-3 px-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    >
                      {selectedArtwork.sizes.map(size => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    // 8. Update onClick to call the new function
                    onClick={handleAddToCart}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-400 dark:hover:shadow-amber-900"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showNotification && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            ✅ Added to cart successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};