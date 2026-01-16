import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="w-full max-w-screen-xl mx-auto px-4 py-8 md:py-12">
        {/* Top section - Logo and Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src="https://static.vecteezy.com/system/resources/previews/022/580/623/non_2x/movie-media-letter-logo-design-illustration-free-vector.jpg"
              className="h-16 w-16 object-contain"
              alt="Movie123 Logo"
            />
            <span className="text-2xl font-bold text-white">Movie123</span>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-wrap items-center gap-4 md:gap-6 text-sm font-medium">
              <li>
                <a
                  href="/#about"
                  className="hover:text-gray-300 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#privacy"
                  className="hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/#licensing"
                  className="hover:text-gray-300 transition-colors"
                >
                  Licensing
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="hover:text-gray-300 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-6" />

        {/* Bottom section - Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Movie123. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
