import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import type { Artwork } from '../data/artworks';
import { artworks, categories } from '../data/artworks';

// Format price helper
const formatPrice = (price: number) => `Rs ${price.toLocaleString()}`;

const Gallery: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filtered artworks
  const filteredArtworks =
    selectedCategory === 'All'
      ? artworks
      : artworks.filter((artwork) => artwork.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-white dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Gallery
          </h2>
          <div className="w-24 h-1 bg-gold-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our collection of sacred calligraphy, where each piece tells a story of faith and artistry.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gold-600 text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-zinc-800"
              >
                <div className="relative overflow-hidden cursor-pointer">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  {/* Featured Badge */}
                  {artwork.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col items-start">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors duration-300">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{artwork.category}</p>
                  <div className="flex items-center justify-between w-full mb-4">
                    <span className="text-2xl font-bold text-gold-600">{formatPrice(artwork.price)}</span>
                    <div className="flex gap-1">
                      {artwork.sizes.slice(0, 2).map((size) => (
                        <span
                          key={size}
                          className="text-xs bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                        >
                          {size}
                        </span>
                      ))}
                      {artwork.sizes.length > 2 && (
                        <span className="text-xs bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                          +{artwork.sizes.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedArtwork(artwork)}
                    className="mt-auto w-full py-2 rounded-md bg-gold-600 text-white font-semibold hover:bg-gold-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedArtwork(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors duration-200"
                >
                  <X size={24} />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={selectedArtwork.imageUrl}
                      alt={selectedArtwork.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {selectedArtwork.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="bg-gold-100 dark:bg-gold-900/30 text-gold-700 dark:text-gold-400 px-3 py-1 rounded-full text-sm font-medium">
                        {selectedArtwork.category}
                      </span>
                      <span className="text-2xl font-bold text-gold-600">
                        {formatPrice(selectedArtwork.price)}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {selectedArtwork.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Available Sizes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedArtwork.sizes.map((size) => (
                          <span
                            key={size}
                            className="bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg font-medium"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-2 rounded-md bg-gold-600 text-white font-semibold hover:bg-gold-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
