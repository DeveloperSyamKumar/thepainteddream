import React from "react";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaFacebook, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-100 to-blue-200 text-gray-800 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Logo & About */}
        <div className="sm:col-span-2">
          <h1 className="text-xl font-bold text-blue-800 mb-2">
            The Painted Dream 🎨
          </h1>
          <p className="text-xs text-gray-700 leading-relaxed">
            Handcrafted art that speaks to your soul. 
            From custom paintings to unique frames — 
            every creation is made with love and imagination.
          </p>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://www.instagram.com/thepainteddream2025?igsh=dG9ydGx0ZzNzOWdq_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-pink-600 transition-colors duration-300"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://wa.me/9603655683"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 transition-colors duration-300"
            >
              <FaWhatsapp size={22} />
            </a>
            <a
              href="mailto:thepainteddream@gmail.com"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>

        {/* Artist Details */}
        <div>
          <h2 className="text-base font-semibold text-blue-900 mb-2">Artist</h2>
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> Ms. Aishwarya
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Specialty:</span> Mandala & Custom Art
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:thepainteddream2025@gmail.com"
              className="text-blue-700 hover:underline"
            >
              thepainteddream2025@gmail.com
            </a>
          </p>
          {/* <p className="text-gray-700">
            <span className="font-medium">Contact:</span>{" "}
            <a
              href="tel:+9603655683"
              className="text-blue-700 hover:underline"
            >
              +91 9603655683
            </a>
          </p> */}
        </div>

        {/* Developer Details */}
        <div>
          <h2 className="text-base font-semibold text-blue-900 mb-2">Developer</h2>
          <p className="text-gray-700">
            <span className="font-medium">Name:</span> Syam Kumar G
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Role:</span> Full Stack Developer
          </p>
          
          <p className="text-gray-700">
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:syamkumargorli2002@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
          >
              syamkumargorli2002@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-300 py-2 text-center text-xs text-gray-700">
        © {new Date().getFullYear()} The Painted Dream. All rights reserved. |
        Developed with ❤️ by{" "}
        <a
          href="https://github.com/SyamKumarG"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 font-medium hover:underline"
        >
          Syam Kumar G
        </a>
      </div>
    </footer>
  );
};

export default Footer;
