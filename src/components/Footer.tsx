
export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Muslim Art. All rights reserved.
          </div>
          <div className="flex mt-4 md:mt-0 space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-300">
              <span className="sr-only">Twitter</span>
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.533A8.349 8.349 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.114 4.114 0 001.822-2.273 8.243 8.243 0 01-2.606.996 4.109 4.109 0 00-6.993 3.755 11.644 11.644 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 012.8 9.715v.053a4.122 4.122 0 003.29 4.024 4.12 4.12 0 01-1.853.07 4.11 4.11 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.844" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-300">
              <span className="sr-only">Instagram</span>
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.7.01 3.674.058 2.648.128 3.948 1.459 4.076 4.074.048.975.058 1.245.058 3.674v.006c0 2.43-.01 2.7-.058 3.674-.128 2.648-1.459 3.948-4.074 4.076-.975.048-1.245.058-3.674.058h-.012c-2.43 0-2.7-.01-3.675-.058-2.648-.128-3.948-1.459-4.075-4.074-.048-.975-.058-1.245-.058-3.674v-.006c0-2.43.01-2.7.058-3.675.128-2.648 1.459-3.948 4.074-4.075.975-.048 1.245-.058 3.675-.058h.012zm-.733 4.319a5.228 5.228 0 100 10.457A5.228 5.228 0 0011.582 4.32a.84.84 0 01-.005.006.85.85 0 01-.005.005.85.85 0 01-.005.006.84.84 0 01-.005.006.84.84 0 01-.005.006a.84.84 0 01-.005.006zm-5.011 2.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm5.011 1.76a3.228 3.228 0 11-6.456 0 3.228 3.228 0 016.456 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition duration-300">
              <span className="sr-only">Facebook</span>
              <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873V14.89h-2.54V12h2.54V9.794c0-2.508 1.49-3.89 3.779-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.262c-1.225 0-1.636.756-1.636 1.565V12h2.77l-.44 2.89h-2.33v6.983C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
