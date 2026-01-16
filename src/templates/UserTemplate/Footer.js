import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-primary-soft rounded-base shadow-xs border border-default m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/022/580/623/non_2x/movie-media-letter-logo-design-illustration-free-vector.jpg"
              className="h-20 w-auto"
              alt="Flowbite Logo"
            />
            <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">
              Movie123
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
            <li>
              <p className="hover:underline me-4 md:me-6">About</p>
            </li>
            <li>
              <p className="hover:underline me-4 md:me-6">Privacy Policy</p>
            </li>
            <li>
              <p className="hover:underline me-4 md:me-6">Licensing</p>
            </li>
            <li>
              <p className="hover:underline">Contact</p>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8" />
        <span className="block text-sm text-body sm:text-center">
          © 2023{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
