import { useState } from 'react';
import { artworks } from '../data/artworks';
import { formatPrice } from '../utils/formatPrice';

export const FeaturedArtworks = () => {
  const featuredArtworks = artworks.filter(artwork => artwork.featured);

  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);

  const openModal = (artwork: typeof artworks[0]) => setSelectedArtwork(artwork);
  const closeModal = () => setSelectedArtwork(null);

  return (
    <section className="bg-white dark:bg-zinc-900 py-16 sm:py-24" id="featured-art">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Artworks
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Hand-picked selections of our most celebrated pieces.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArtworks.map(artwork => (
            <div
              key={artwork.id}
              className="group relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openModal(artwork)}
            >
              <div className="w-full h-80 overflow-hidden">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 bg-white dark:bg-zinc-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {artwork.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {artwork.artist}
                </p>
                <p className="mt-2 text-lg font-bold text-amber-600 dark:text-amber-500">
                  {formatPrice(artwork.price)}
                </p>
                <button
                  onClick={() => openModal(artwork)}
                  className="mt-4 w-full bg-amber-600 text-white py-2 rounded-md font-medium hover:bg-amber-700 transition duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-3xl w-full overflow-hidden relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
            >
              ✕
            </button>
            <div className="md:flex">
              <img
                src={selectedArtwork.imageUrl}
                alt={selectedArtwork.title}
                className="w-full md:w-1/2 h-80 object-cover"
              />
              <div className="p-6 md:w-1/2">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {selectedArtwork.title}
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">{selectedArtwork.artist}</p>
                <p className="mt-4 text-2xl font-bold text-amber-600 dark:text-amber-500">
                  {formatPrice(selectedArtwork.price)}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{selectedArtwork.description}</p>
                <div className="mt-4">
                  <span className="font-semibold">Available Sizes: </span>
                  {selectedArtwork.sizes.join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
