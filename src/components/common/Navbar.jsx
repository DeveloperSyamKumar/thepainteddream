
// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaHome, FaPaintBrush, FaFire } from "react-icons/fa";
// import logo from "../assets/images/logo.png";

// const Navbar = () => {
//   const linkClasses = ({ isActive }) =>
//     `relative flex items-center gap-1 sm:gap-2 font-medium transition-all duration-300
//      ${isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-500"}
//      after:content-[''] after:absolute after:-bottom-1 after:left-0
//      after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300
//      ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

//   return (
//     <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
//       <div className="max-w-6xl w-full mx-auto
//                       flex items-center justify-between
//                       px-3 sm:px-4 md:px-6
//                       h-14 sm:h-16 md:h-20">

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2">
//           <img
//             src={logo}
//             alt="The Painted Dream Logo"
//             className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
//           />
//           <span className="hidden sm:inline text-lg md:text-xl font-bold text-gray-800">
//             The Painted Dream
//           </span>
//         </Link>

//         {/* Menu */}
//         <div className="flex items-center gap-4 sm:gap-6 md:gap-8
//                         text-xs sm:text-sm md:text-base
//                         whitespace-nowrap">
          
//           <NavLink to="/" className={linkClasses}>
//             <FaHome className="text-base sm:text-lg md:text-xl" />
//             <span className="hidden sm:inline">Home</span>
//           </NavLink>

//           <NavLink to="/candleGallery" className={linkClasses}>
//             <FaFire className="text-base sm:text-lg md:text-xl" />
//             <span className="hidden sm:inline">Candle Gallery</span>
//           </NavLink>

//           <NavLink to="/customize" className={linkClasses}>
//             <FaPaintBrush className="text-base sm:text-lg md:text-xl" />
//             <span className="hidden sm:inline">Customize</span>
//           </NavLink>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHome, FaPaintBrush, FaFire, FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { cartItems, toggleCart } = useCart();

  const linkClasses = ({ isActive }) =>
    `relative flex items-center gap-1 sm:gap-2 font-medium transition-all duration-300
     ${isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-500"}
     after:content-[''] after:absolute after:-bottom-1 after:left-0
     after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <div
        className="
          max-w-6xl w-full mx-auto
          flex items-center
          justify-center sm:justify-between gap-5 sm:gap-0
          px-2 sm:px-4 md:px-6
          h-12 sm:h-16 md:h-20
        "
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 sm:gap-2 shrink-0">
          <img
            src={logo}
            alt="The Painted Dream Logo"
            className="h-10 sm:h-10 md:h-12 lg:h-14 w-auto"
          />
          <span className="hidden sm:inline text-lg md:text-xl font-bold text-gray-800">
            The Painted Dream
          </span>
        </Link>


        <div className="flex items-center gap-10 sm:gap-6 md:gap-8">
          {/* Menu */}
          <div
            className="
              flex items-center
              gap-10 sm:gap-6 md:gap-8
              text-xs sm:text-sm md:text-base
              whitespace-nowrap
            "
          >
            <NavLink to="/" className={linkClasses}>
              <FaHome className="text-base sm:text-lg md:text-xl" />
              <span className="hidden sm:inline">Home</span>
            </NavLink>

            <NavLink to="/candleGallery" className={linkClasses}>
              <FaFire className="text-base sm:text-lg md:text-xl" />
              <span className="hidden sm:inline">Candle Gallery</span>
            </NavLink>

            <NavLink to="/customize" className={linkClasses}>
              <FaPaintBrush className="text-base sm:text-lg md:text-xl" />
              <span className="hidden sm:inline">Customize</span>
            </NavLink>
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => toggleCart(true)}
            className="relative p-2 text-gray-700 hover:text-indigo-600 transition"
          >
            <FaShoppingCart className="text-xl sm:text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
