import React, { useState, useEffect } from "react";

const ProductCarousel = ({ images = [], onClick, altText, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const itv = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(itv);
  }, [images]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setIndex((p) => (p + 1) % images.length);
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-lg shadow-md group ${className || "h-64 sm:h-96"}`}>
      <img
        src={images[index]}
        className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
        onClick={() => onClick && onClick(images[index], index)}
        alt={`${altText} - view ${index + 1}`}
      />

      {/* ⬅ */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2
                     bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ❮
        </button>
      )}

      {/* ➡ */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ❯
        </button>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
