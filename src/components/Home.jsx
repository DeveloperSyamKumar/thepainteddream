import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";

// WhatsApp Order Modal Component
function WhatsAppOrderModal({ product, isOpen, onClose, userInfo, setUserInfo }) {
  const ADMIN_PHONE = "919030577270"; // replace with your WhatsApp number

  if (!isOpen) return null;

  const handleChange = (e) =>
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

  // use first image if images array exists
  const imageForMessage = Array.isArray(product?.images)
    ? product.images[0]
    : product?.image;

  const handleSendWhatsApp = () => {
    const pageUrl = window.location.href;

    const priceText =
      product.price === "N/A" || product.price === "  N/A"
        ? "Please share the price and available customization options for this product."
        : `₹${product.price}`;

    const message = `🛍️ *THE PAINTED DREAM ORDER INQUIRY* 🛍️

Hello! 👋 I would like to order this product from *THE PAINTED DREAM* website:

👤 *Name:* ${userInfo.name || "Not provided"}
📞 *Phone:* ${userInfo.phone || "Not provided"}

🖼️ *Product:* ${product.name}
💰 *Price:* ${priceText}
📄 *Details:* ${product.details}

🖼️ *Image Link:* ${imageForMessage || "Not provided"}
🌐 *Page:* ${pageUrl}

Please let me know the next steps.`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-11/12 sm:w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Your Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={userInfo.name}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-full mb-3"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone (optional)"
          value={userInfo.phone}
          onChange={handleChange}
          className="border rounded px-4 py-2 w-full mb-4"
        />
        <button
          onClick={handleSendWhatsApp}
          className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          <FaWhatsapp size={18} />
          Send Order on WhatsApp
        </button>
      </div>
    </div>
  );
}

// Mini Product Carousel used for cards when product.images exists
function ProductCarousel({ images = [], onClick }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    if (!images || images.length <= 1) return;
    intervalRef.current = setInterval(next, 2500);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded">
      <img
        src={images[index]}
        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={onClick}
        alt={`carousel-${index}`}
      />

      {images.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full"
            aria-label="Previous"
          >
            ❮
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full"
            aria-label="Next"
          >
            ❯
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-gray-400"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Main Home Component
const Home = () => {
  const carouselImages = [
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999063/MAIN_rns2jm.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0002_ophrkn.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0004_t0sfko.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0003_dgrnuj.jpg",
  ];

  // Trending products. Products 13,14,15 have 'images' arrays (placeholder repeats).
  const trendingProducts = [
    {
      id: 13,
      name: "3d Moon",
      images: [
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763581671/WhatsApp_Image_2025-11-20_at_1.16.56_AM_k9smfq.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763581671/WhatsApp_Image_2025-11-20_at_1.16.56_AM_1_r5ugsc.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765390702/maxresdefault_eobqsv.jpg",
      ],
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 14,
      name: "HAND-MADE GIFT BOX",
      images: [
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1762534677/likki_02_oyfuiy.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763579906/likki_03_pdy961.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1762534677/likki_01_nifvff.jpg",
      ],
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 15,
      name: "HAND-MADE GIFT BOX",
      images: [
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763581672/WhatsApp_Image_2025-11-20_at_1.14.47_AM_2_wtoso1.jpg",
         "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763581672/WhatsApp_Image_2025-11-20_at_1.14.48_AM_ynvcbh.jpg",
         "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763581672/WhatsApp_Image_2025-11-20_at_1.14.47_AM_1_v6bl2l.jpg",
         "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763581671/WhatsApp_Image_2025-11-20_at_1.14.47_AM_j7vd6s.jpg",
      ],
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },

    // the rest remain single-image products
    {
      id: 1,
      name: "Mandala Art Key Chains",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999062/IMG-20250926-WA0019_mecorg.jpg",
      price: 60,
      details: "Each keychain costs 60/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 2,
      name: "Key chains",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999062/IMG-20250926-WA0012_elwxfj.jpg",
      price: 59,
      details: "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 3,
      name: "Key Chains",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999062/IMG-20250926-WA0009_t228dq.jpg",
      price: 59,
      details: "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 4,
      name: "Key Chains",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999061/IMG-20250926-WA0011_rfp8ge.jpg",
      price: 59,
      details: "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 5,
      name: "Key Chains",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999061/IMG-20250926-WA0010_b9vvgj.jpg",
      price: 59,
      details: "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 6,
      name: "VINTAGE FRAMES",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999061/IMG-20250926-WA0005_dkcc1h.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Frames",
    },
    {
      id: 7,
      name: "3D MOON",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/IMG-20250926-WA0007_u1kj34.jpg",
      price: 500,
      details: "3d moon 6inch Wooden wall Moon light lamp Hand crafted 3d moon design",
      category: "Trending",
    },
    {
      id: 8,
      name: "3D MOON",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/IMG-20250926-WA0007_u1kj34.jpg",
      price: 1000,
      details: "3d moon 12inch Wooden wall Moon light lamp Hand crafted 3d moon design",
      category: "Trending",
    },
    {
      id: 9,
      name: "3D MOON",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/IMG-20250926-WA0007_u1kj34.jpg",
      price: 1250,
      details: "3d moon 15inch Wooden wall Moon light lamp Hand crafted 3d moon design",
      category: "Trending",
    },
    {
      id: 10,
      name: "ROUND FRAME",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758912402/WhatsApp_Image_2025-09-26_at_23.59.31_453b090c_ytawq1.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 11,
      name: "Square Frame 2",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758912388/WhatsApp_Image_2025-09-26_at_23.59.30_2d1e6a96_gfuosd.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 12,
      name: "SQUARE FRAME",
      image: "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1759010363/WhatsApp_Image_2025-09-26_at_23.59.29_f3fb1a24_glh5iu_e31bec.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
  ];

  // Homepage hero carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(slideInterval.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % carouselImages.length);

  // Modal & User info state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // enlarged viewer state supports multi-image
  const [enlarged, setEnlarged] = useState({ images: [], index: 0 });

  // zoom state for pinch-to-zoom
  const [zoomScale, setZoomScale] = useState(1);
  const lastDistance = useRef(null);
  const swipeStart = useRef(null);
  const lastTap = useRef(0);

  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "" };
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    localStorage.setItem("whatsappUserInfo", JSON.stringify(userInfo));
  };

  // click on image in card -> open enlarged viewer (works for images array or single image)
  const openEnlargedFromProduct = (p, startIndex = 0) => {
    const imgs = Array.isArray(p.images) ? p.images : p.image ? [p.image] : [];
    setEnlarged({ images: imgs, index: startIndex });
    setZoomScale(1);
  };

  // touch handlers for swipe and pinch
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      swipeStart.current = e.touches[0].clientX;
    } else {
      swipeStart.current = null;
    }
    // double tap detection
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // double tap -> toggle zoom between 1 and 2
      setZoomScale((s) => (s > 1 ? 1 : 2));
    }
    lastTap.current = now;
  };

  const handleTouchMove = (e) => {
    // pinch-to-zoom
    if (e.touches.length >= 2) {
      const [t1, t2] = e.touches;
      const distance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

      if (lastDistance.current != null) {
        let delta = distance - lastDistance.current;
        let newScale = zoomScale + delta * 0.005;
        newScale = Math.max(1, Math.min(newScale, 4));
        setZoomScale(newScale);
      }
      lastDistance.current = distance;
      return;
    }

    // swipe for single touch (only if not zoomed)
    if (swipeStart.current != null && e.touches.length === 1 && zoomScale === 1) {
      const diff = swipeStart.current - e.touches[0].clientX;
      if (diff > 50) {
        // next
        setEnlarged((prev) => ({
          ...prev,
          index: (prev.index + 1) % prev.images.length,
        }));
        swipeStart.current = null;
      } else if (diff < -50) {
        // prev
        setEnlarged((prev) => ({
          ...prev,
          index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1,
        }));
        swipeStart.current = null;
      }
    }
  };

  const handleTouchEnd = () => {
    lastDistance.current = null;
    swipeStart.current = null;
  };

  // keyboard nav for enlarged viewer
  useEffect(() => {
    const keyHandler = (e) => {
      if (!enlarged.images || enlarged.images.length === 0) return;
      if (e.key === "ArrowRight") {
        setEnlarged((prev) => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
      } else if (e.key === "ArrowLeft") {
        setEnlarged((prev) => ({ ...prev, index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1 }));
      } else if (e.key === "Escape") {
        setEnlarged({ images: [], index: 0 });
        setZoomScale(1);
      }
    };
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [enlarged]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-12">
      {/* Carousel */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`slide-${idx}`}
              className="w-full flex-shrink-0 h-full object-cover"
            />
          ))}
        </div>
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full hover:bg-black/70"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded-full hover:bg-black/70"
        >
          &#10095;
        </button>
      </div>

      {/* Trending Products */}
      <h1 className="text-3xl font-bold text-center">Trending Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trendingProducts.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
          >
            {/* If product has images array -> show ProductCarousel, else show single <img> */}
            {Array.isArray(p.images) ? (
              <ProductCarousel images={p.images} onClick={() => openEnlargedFromProduct(p, 0)} />
            ) : (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => openEnlargedFromProduct(p, 0)}
              />
            )}

            <h2 className="text-lg font-semibold mt-3">{p.name}</h2>
            <p className="text-gray-700">{p.details}</p>
            <p className="text-green-700 font-bold mt-1">
              {p.price === "N/A" ? "Contact for Price" : `₹${p.price}`}
            </p>
            <button
              onClick={() => openModal(p)}
              className="mt-auto flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              <FaWhatsapp size={18} />
              Order on WhatsApp
            </button>
          </div>
        ))}
      </div>

      {/* Enlarged Viewer Modal (supports arrays and single images) */}
      {enlarged.images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60]"
          onClick={() => {
            setEnlarged({ images: [], index: 0 });
            setZoomScale(1);
          }}
        >
          <div
            className="relative max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-20"
              onClick={() => {
                setEnlarged({ images: [], index: 0 });
                setZoomScale(1);
              }}
              aria-label="Close"
            >
              ×
            </button>

            {/* Left Arrow */}
            {enlarged.images.length > 1 && (
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full text-2xl z-20"
                onClick={() =>
                  setEnlarged((prev) => ({
                    ...prev,
                    index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1,
                  }))
                }
                aria-label="Previous image"
              >
                ❮
              </button>
            )}

            {/* Image wrapper for transitions & zoom */}
            <div className="relative w-full max-h-[90vh] overflow-hidden flex items-center justify-center">
              <img
                key={enlarged.index}
                src={enlarged.images[enlarged.index]}
                alt={`enlarged-${enlarged.index}`}
                style={{
                  transform: `scale(${zoomScale})`,
                  transition: "transform 200ms ease, opacity 300ms ease",
                }}
                className="w-full max-h-[90vh] object-contain rounded-xl shadow-lg"
                draggable={false}
              />
            </div>

            {/* Right Arrow */}
            {enlarged.images.length > 1 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full text-2xl z-20"
                onClick={() =>
                  setEnlarged((prev) => ({
                    ...prev,
                    index: (prev.index + 1) % prev.images.length,
                  }))
                }
                aria-label="Next image"
              >
                ❯
              </button>
            )}

            {/* Dots */}
            {enlarged.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {enlarged.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnlarged((prev) => ({ ...prev, index: i }));
                      setZoomScale(1);
                    }}
                    className={`w-2 h-2 rounded-full ${i === enlarged.index ? "bg-white" : "bg-gray-400"}`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <WhatsAppOrderModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
    </div>
  );
}

export default Home
