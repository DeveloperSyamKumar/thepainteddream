import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCarousel from "../components/common/ProductCarousel";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";

const getProductImages = (p) =>
  Array.isArray(p?.images) ? p.images : p?.image ? [p.image] : [];

/* ------------------ MAIN COMPONENT ------------------ */



const CandleGallery = () => {
  const { addToCart, toggleCart } = useCart();
  const galleryProducts = products.filter((p) => p.sourcePage === "candle");

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <Helmet>
        <title>The Painted Dream - Candle Gallery</title>
        <meta name="description" content="Explore our premium scented candles collection. Handcrafted for your home." />
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8">
        {" "}
        Premium Scented Candles
      </h1>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryProducts.map((p) => {
          const images = getProductImages(p);
          return (
            <div key={p.id} className="border p-4 rounded shadow">
              <Link to={`/product/${p.id}`} className="block relative group">
                <ProductCarousel
                  images={images}
                  altText={p.name}
                  className="h-48"
                />
              </Link>

              <Link to={`/product/${p.id}`}>
                <h2 className="mt-3 font-semibold hover:text-green-600 transition">{p.name}</h2>
              </Link>
              <p className="text-sm text-gray-700 md:line-clamp-2">{p.details}</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addToCart(p)}
                   className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded transition font-medium text-sm"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${p.id}`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded flex justify-center gap-2 items-center text-sm font-medium"
                >
                  <FaWhatsapp /> Order
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default CandleGallery