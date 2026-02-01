import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { FaWhatsapp, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import ProductCarousel from "../components/common/ProductCarousel";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleCart } = useCart();
  const [product, setProduct] = useState(null);
  const [enlargedIndex, setEnlargedIndex] = useState(-1);
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "" };
  });

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (!found) {
        // Fallback or redirect if not found
        // navigate("/"); 
    }
    setProduct(found);
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) return <div className="p-10 text-center">Loading product...</div>;

  const images = Array.isArray(product.images)
    ? product.images
    : [product.image];

  const handleWhatsAppOrder = () => {
    const ADMIN_PHONE = "919603655683";
    const pageUrl = window.location.href;
    const priceText =
      product.price === "N/A" || product.price === "  N/A"
        ? "Please share the price."
        : `₹${product.price}`;

    const message = `🛍️ *ORDER INQUIRY*
    
👤 *Name:* ${userInfo.name || "Not provided"}
📞 *Phone:* ${userInfo.phone || "Not provided"}

🖼️ *Product:* ${product.name}
💰 *Price:* ${priceText}
📄 *Details:* ${product.details}

🌐 *Link:* ${pageUrl}`;

    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const handleChange = (e) => {
    const updated = { ...userInfo, [e.target.name]: e.target.value };
    setUserInfo(updated);
    localStorage.setItem("whatsappUserInfo", JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <Helmet>
        <title>{product.name} - The Painted Dream</title>
        <meta name="description" content={product.details} />
      </Helmet>

      {/* Enlarged Image Modal */}
      {enlargedIndex >= 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setEnlargedIndex(-1)}
        >
          <div 
            className="relative max-w-4xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
             <button 
               className="absolute top-4 right-4 text-white text-3xl font-bold z-10 hover:text-gray-300"
               onClick={() => setEnlargedIndex(-1)}
             >
               &times;
             </button>
             
             {/* Prev Button */}
             {images.length > 1 && (
               <button
                 className="absolute left-2 text-white text-4xl p-2 hover:text-gray-300 z-10"
                 onClick={(e) => {
                    e.stopPropagation();
                    setEnlargedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                 }}
               >
                 &#10094;
               </button>
             )}

             <img 
               src={images[enlargedIndex]} 
               alt="Enlarged view" 
               className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
             />

             {/* Next Button */}
             {images.length > 1 && (
               <button
                 className="absolute right-2 text-white text-4xl p-2 hover:text-gray-300 z-10"
                 onClick={(e) => {
                    e.stopPropagation();
                    setEnlargedIndex((prev) => (prev + 1) % images.length);
                 }}
               >
                 &#10095;
               </button>
             )}
          </div>
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black transition"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 p-6">
        
        {/* Left: Images */}
        <div className="w-full">
           {images.length > 0 ? (
             <ProductCarousel 
               images={images} 
               altText={product.name} 
               onClick={(_, idx) => setEnlargedIndex(idx)}
             />
           ) : (
             <img src="/placeholder.png" alt="No preview" className="w-full h-64 object-cover rounded-lg" />
           )}
           <p className="text-center text-xs text-gray-400 mt-2 italic">Tap image to enlarge</p>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          <span className="inline-block bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full w-fit mb-2 font-bold uppercase tracking-wider">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl font-semibold text-green-700 mb-4">
             {product.price === "N/A" ? "Contact for Price" : `₹${product.price}`}
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
             <h3 className="font-semibold mb-1 text-gray-700">Description:</h3>
             <p className="text-gray-600 leading-relaxed text-sm">
               {product.details}
             </p>
          </div>

          {/* User Info for WhatsApp */}
          <div className="mb-6">
             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Details (for Order)</label>
             <div className="flex gap-2 flex-col sm:flex-row">
               <input 
                 name="name" 
                 value={userInfo.name} 
                 onChange={handleChange} 
                 placeholder="Your Name" 
                 className="border rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-pink-500"
               />
               <input 
                 name="phone" 
                 value={userInfo.phone} 
                 onChange={handleChange} 
                 placeholder="Phone (Optional)" 
                 className="border rounded px-3 py-2 text-sm w-full focus:outline-none focus:border-pink-500"
               />
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-white border-2 border-red-500 text-red-500 py-3 rounded-lg font-bold hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product);
                toggleCart(true); 
                handleWhatsAppOrder();
              }}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg shadow-green-200"
            >
              <FaWhatsapp className="text-xl" /> Order Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
