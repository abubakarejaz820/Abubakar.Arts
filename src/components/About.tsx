import type { ReactElement } from 'react';

export const About = (): ReactElement => {
  return (
    <section id="about" className="bg-white dark:bg-zinc-900 py-20 sm:py-32 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-zinc-800 dark:to-zinc-900 w-full h-full opacity-20 pointer-events-none"></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-12">
        {/* Title Section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            About <span className="text-amber-500">Abubakar.Arts</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Blending tradition with a modern touch to create art that speaks to the soul.
          </p>
        </div>

        {/* Mission & Image Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="md:order-2 relative group">
            <div className="overflow-hidden rounded-3xl shadow-2xl transform transition-transform duration-700 hover:scale-105 hover:rotate-1">
              <img
                className="w-full h-auto object-cover"
                src="/images/profile-pic.jpg"
                alt="Abubakar - The Artist"
              />
            </div>
            <div className="absolute inset-0 rounded-3xl border-2 border-amber-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
          </div>

          {/* Content */}
          <div className="md:order-1">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide">
              Our Mission
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              At <span className="font-semibold text-amber-500">Abubakar.Arts</span>, our mission is to make timeless Islamic art accessible globally. We harness the power of calligraphy and sacred geometry to inspire, beautify spaces, and connect people to their heritage and faith. Each piece is crafted with dedication, ensuring it is not just a product, but a legacy.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              Every canvas is a journey of devotion and creativity, from the first sketch to the final stroke. We honor the rich tradition of Islamic art while infusing a contemporary perspective that resonates with modern homes.
            </p>
          </div>
        </div>

        {/* Artist Section */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide">
            Meet the Artist: <span className="text-amber-500">Abubakar</span>
          </h3>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            Abubakar, the visionary behind <span className="font-semibold text-amber-500">Abubakar.Arts</span>, is a self-taught artist with a deep passion for Islamic calligraphy and abstract art. He meticulously studied classical scripts and developed a unique style blending traditional elegance with modern abstraction. His work reflects his spiritual journey and dedication to sharing the beauty of Islamic art with the world.
          </p>
        </div>
      </div>
    </section>
  );
};
