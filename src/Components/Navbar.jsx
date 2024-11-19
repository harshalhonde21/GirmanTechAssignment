import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Import useLocation for active route

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation(); // Get the current route

  // Function to determine active link styles
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white shadow-md sticky top-0 z-50"> {/* Added sticky class */}
      <div className="container mx-auto px-6 lg:px-24 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/Logo.svg" alt="Girman Logo" className="w-36 h-20" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 font-inter">
          <Link
            to="/search-card"
            className={`${
              isActive("/search-card") ? "text-blue-600 underline" : "text-gray-700 hover:text-gray-900"
            } font-medium`}
          >
            SEARCH
          </Link>
          <Link
            to="https://girmantech.com/"
            target="_"
            className="text-gray-700 hover:text-gray-900"
          >
            WEBSITE
          </Link>
          <Link
            to="https://www.linkedin.com/company/girmantech/"
            target="_"
            className="text-gray-700 hover:text-gray-900"
          >
            LINKEDIN
          </Link>
          <Link
            to="/contact"
            className={`${
              isActive("/contact") ? "text-blue-600 underline" : "text-gray-700 hover:text-gray-900"
            }`}
          >
            CONTACT
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden relative">
          <button
            type="button"
            className="text-gray-700 focus:outline-none"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-12 right-0 bg-white shadow-lg border rounded-md w-40">
              <Link
                to="/search-card"
                className={`block px-4 py-2 ${
                  isActive("/search-card") ? "text-blue-600 underline" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)} // Close menu on click
              >
                SEARCH
              </Link>
              <Link
                to="https://girmantech.com/"
                target="_"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                WEBSITE
              </Link>
              <Link
                to="https://www.linkedin.com/company/girmantech/"
                target="_"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                LINKEDIN
              </Link>
              <Link
                to="/contact"
                className={`block px-4 py-2 ${
                  isActive("/contact") ? "text-blue-600 underline" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)} // Close menu on click
              >
                CONTACT
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
