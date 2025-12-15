
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaImages,
  FaPaintBrush,
  FaBars,
  FaTimes,
  FaFire,
  FaSmile,
} from "react-icons/fa";
import logo from "../assets/images/logo.png";

const Navbar = ()  =>{
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 font-medium ${
      isActive ? "text-indigo-600" : "text-gray-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b h-14 sm:h-16 md:h-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-3 h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="The Painted Dream Logo"
            className="h-8 sm:h-10 md:h-20 w-auto"
          />
          <span className="text-xl font-bold text-gray-800 hidden sm:inline">
            The Painted Dream
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClasses}>
            <FaHome /> Home
          </NavLink>

          <NavLink to="/candleGallery" className={linkClasses}>
            <FaFire /> Candle Gallery
          </NavLink>

          <NavLink to="/customize" className={linkClasses}>
            <FaPaintBrush /> Customize
          </NavLink>

          {/* <NavLink to="/happyCustomers" className={linkClasses}>
            <FaSmile /> Happy Customers
          </NavLink> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 bg-white border-t">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClasses}>
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/candleGallery"
            onClick={() => setIsOpen(false)}
            className={linkClasses}
          >
            <FaFire /> Candle Gallery
          </NavLink>

          <NavLink
            to="/customize"
            onClick={() => setIsOpen(false)}
            className={linkClasses}
          >
            <FaPaintBrush /> Customize
          </NavLink>

          {/* <NavLink
            to="/happyCustomers"
            onClick={() => setIsOpen(false)}
            className={linkClasses}
          >
            <FaSmile /> Happy Customers
          </NavLink> */}
        </div>
      )}
    </nav>
  );
}

export default Navbar
