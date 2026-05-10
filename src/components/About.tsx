import type { ReactElement } from 'react';

export const About = (): ReactElement => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 sm:py-36 bg-gradient-to-br from-white via-amber-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-900"
    >
      {/* Animated Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-800 rounded-full opacity-20 animate-blob-1 pointer-events-none blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-amber-400 to-amber-600 dark:from-amber-600 dark:to-amber-800 rounded-full opacity-20 animate-blob-2 pointer-events-none blur-3xl"></div>

      <div className="relative container mx-auto px-6 lg:px-12">
        {/* Title Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight drop-shadow-lg">
            About <span className="text-amber-500">Abubakar.Arts</span>
          </h2>
          <p className="mt-6 text-2xl text-gray-600 dark:text-gray-300 font-medium drop-shadow">
            Blending tradition with a modern touch to create art that speaks to the soul.
          </p>
        </div>

        {/* Mission & Image Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="md:order-2 relative group">
            <div className="overflow-hidden rounded-3xl shadow-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg border-4 border-amber-400 dark:border-amber-700 transform transition-transform duration-700 hover:scale-105 hover:rotate-1">
              <img
                className="w-full h-auto object-cover"
                src="/images/profile-pic.jpg"
                alt="Abubakar - The Artist"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl border-4 border-amber-500 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          {/* Content */}
          <div className="md:order-1">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white tracking-wide mb-4 drop-shadow-lg">
              Our Mission
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              At <span className="font-semibold text-amber-500">Abubakar.Arts</span>, our mission is to make timeless Islamic art accessible globally. We harness the power of calligraphy and sacred geometry to inspire, beautify spaces, and connect people to their heritage and faith. Each piece is crafted with dedication, ensuring it is not just a product, but a legacy.
            </p>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Every canvas is a journey of devotion and creativity, from the first sketch to the final stroke. We honor the rich tradition of Islamic art while infusing a contemporary perspective that resonates with modern homes.
            </p>
          </div>
        </div>

        {/* Artist Section */}
        <div className="mt-24 max-w-3xl mx-auto text-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-xl py-12 px-6 border border-amber-200 dark:border-amber-800">
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white tracking-wide mb-4 drop-shadow-lg">
            Meet the Artist: <span className="text-amber-500">Abubakar</span>
          </h3>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Abubakar, the visionary behind <span className="font-semibold text-amber-500">Abubakar.Arts</span>, is a self-taught artist with a deep passion for Islamic calligraphy and abstract art. He meticulously studied classical scripts and developed a unique style blending traditional elegance with modern abstraction. His work reflects his spiritual journey and dedication to sharing the beauty of Islamic art with the world.
          </p>
        </div>
      </div>
    </section>
  );
};