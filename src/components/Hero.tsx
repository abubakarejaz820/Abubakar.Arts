import { artworks } from '../data/artworks';

export const Hero = () => {
  const featuredArtwork = artworks.find(art => art.featured);

  return (
    <div className="relative overflow-hidden bg-gray-100 dark:bg-zinc-950 pt-16 sm:pt-24 lg:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between space-y-12 lg:space-y-0 lg:space-x-12">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              <span className="block xl:inline">Experience the beauty of</span>{' '}
              <span className="block text-amber-500">Islamic calligraphy.</span>
            </h1>
            <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-xl text-gray-600 dark:text-gray-300">
              Discover unique and handcrafted artworks that bring peace and blessings to your home.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#catalog"
                className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition duration-300"
              >
                Explore Artworks
              </a>
              <a
                href="#contact"
                className="inline-block px-8 py-3 border border-amber-600 text-base font-medium rounded-md text-amber-700 bg-white hover:bg-gray-50 transition duration-300 dark:bg-zinc-900 dark:text-amber-500 dark:hover:bg-zinc-800"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Featured Artwork Image */}
          {featuredArtwork && (
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105">
                <img
                  src={featuredArtwork.imageUrl}
                  alt={featuredArtwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-50"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold">{featuredArtwork.title}</h3>
                  <p className="text-lg font-medium">{featuredArtwork.artist}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
