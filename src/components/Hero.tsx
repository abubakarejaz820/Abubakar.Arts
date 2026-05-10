import { artworks } from '../data/artworks';
import { motion } from 'framer-motion';

export const Hero = () => {
  const featuredArtwork = artworks.find(art => art.featured);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pt-20 sm:pt-28 lg:pt-32">
      <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2016/06/20/09/23/background-1468205_1280.jpg')] dark:bg-[url('https://cdn.pixabay.com/photo/2016/06/20/09/23/background-1468205_1280.jpg')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between space-y-12 lg:space-y-0 lg:space-x-16">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              <span className="block text-amber-500">Exquisite Islamic</span>{' '}
              <span className="block">Calligraphy Art</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Discover unique and handcrafted artworks that bring peace and blessings to your home. Each piece is a testament to timeless beauty and spiritual significance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a
                href="#catalog"
                className="inline-block px-10 py-4 text-base font-semibold rounded-full text-white bg-amber-600 hover:bg-amber-700 shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                Explore Collection
              </a>
              <a
                href="#contact"
                className="inline-block px-10 py-4 border-2 border-amber-600 text-base font-semibold rounded-full text-amber-700 bg-white hover:bg-amber-50 transition duration-300 dark:bg-zinc-900 dark:text-amber-500 dark:hover:bg-zinc-800"
              >
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* Featured Artwork Image */}
          {featuredArtwork && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
                <img
                  src={featuredArtwork.imageUrl}
                  alt={featuredArtwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold drop-shadow-lg">
                    {featuredArtwork.title}
                  </h3>
                  <p className="text-lg font-medium opacity-90 mt-1">
                    {featuredArtwork.artist}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
