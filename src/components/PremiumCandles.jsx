import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { FaWhatsapp } from "react-icons/fa";

/* ------------------ HELPERS ------------------ */

const ADMIN_PHONE = "919030577270";

const getProductImages = (p) =>
  Array.isArray(p?.images) ? p.images : p?.image ? [p.image] : [];

const getPriceText = (price) =>
  price === "N/A" || price === "  N/A"
    ? "Please share the price and available customization options."
    : `₹${price}`;

/* ------------------ WHATSAPP MODAL ------------------ */

const WhatsAppOrderModal = memo(
  ({ product, isOpen, onClose, userInfo, setUserInfo }) => {
    if (!isOpen || !product) return null;

    const handleChange = (e) =>
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

    const handleSend = () => {
      const pageUrl = window.location.href;
      const images = getProductImages(product);

      const message = `🛍️ *THE PAINTED DREAM ORDER INQUIRY*

👤 Name: ${userInfo.name || "Not provided"}
📞 Phone: ${userInfo.phone || "Not provided"}

🖼️ Product: ${product.name}
💰 Price: ${getPriceText(product.price)}
📄 Details: ${product.details}

🖼️ Image: ${images[0] || "Not provided"}
🌐 Page: ${pageUrl}`;

      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
      const url = isMobile
        ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(
            message
          )}`
        : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white w-11/12 sm:w-96 p-6 rounded-xl relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-xl">
            ×
          </button>

          <h2 className="text-xl font-bold mb-4">Your Details</h2>

          <input
            name="name"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full mb-3"
          />

          <input
            name="phone"
            placeholder="Phone (optional)"
            value={userInfo.phone}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full mb-4"
          />

          <button
            onClick={handleSend}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded flex justify-center gap-2"
          >
            <FaWhatsapp />
            Send on WhatsApp
          </button>
        </div>
      </div>
    );
  }
);

/* ------------------ MINI CAROUSEL ------------------ */

const ProductCarousel = memo(({ images, onClick }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      2500
    );
    return () => clearInterval(id);
  }, [images]);

  if (!images.length) return null;

  return (
    <div className="relative h-48 overflow-hidden rounded">
      <img
        src={images[index]}
        alt=""
        onClick={onClick}
        className="w-full h-full object-cover cursor-pointer"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 rounded"
          >
            ❮
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 rounded"
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
});

/* ------------------ MAIN COMPONENT ------------------ */

const  PremiumCandles = ()  =>{
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [enlarged, setEnlarged] = useState({ images: [], index: 0 });
  const [zoom, setZoom] = useState(1);

  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "" };
  });

  const openModal = useCallback((p) => {
    setSelectedProduct(p);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("whatsappUserInfo", JSON.stringify(userInfo));
  };

  const openEnlarged = (p) => {
    setEnlarged({ images: getProductImages(p), index: 0 });
    setZoom(1);
  };

  /* ---- Keyboard Nav ---- */
  useEffect(() => {
    const handler = (e) => {
      if (!enlarged.images.length) return;
      if (e.key === "Escape") setEnlarged({ images: [], index: 0 });
      if (e.key === "ArrowRight")
        setEnlarged((p) => ({
          ...p,
          index: (p.index + 1) % p.images.length,
        }));
      if (e.key === "ArrowLeft")
        setEnlarged((p) => ({
          ...p,
          index: p.index === 0 ? p.images.length - 1 : p.index - 1,
        }));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [enlarged]);

  /* ------------------ PRODUCTS ------------------ */

  const products = [
    // the rest remain single-image products
    {
      id: 1,
      name: "Flower Candle",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765558898/IMG-20251212-WA0002_vhgbnm.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 2,
      name: "Scented Daisy Candle Set of 4 ",
      images: [
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765560061/IMG-20251212-WA0004_q3rrrm.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765558525/IMG-20251211-WA0003_fcdidc.jpg",
      ],
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 5,
      name: "Set of 4 Flower Candles",
      images: [
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765557514/IMG-20251212-WA0007_eg1mmk.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765557676/IMG-20251212-WA0008_y9xyql.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765557602/IMG-20251212-WA0009_urm25o.jpg",
      ],
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 7,
      name: "TULIP CANDLE BOUQUET",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765557219/IMG-20251212-WA0010_ecceqb.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 8,
      name: "TULIP CANDLE",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765556699/IMG-20251212-WA0012_ezpo7z.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 9,
      name: "TULIP CANDLE BOUQUET Set of 3",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765556695/IMG-20251212-WA0011_qhhdy9.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 10,
      name: "Flower Candles Set of 3 ",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765556693/IMG-20251212-WA0014_hh8mm8.jpg",
      price: "N/A",
      details: "CONTACT US for prize `details` and customization",
      category: "Trending",
    },
    {
      id: 11,
      name: "Flower Candle",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765556659/IMG-20251212-WA0016_laihkg.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 12,
      name: "Scented Daisy Candle Set of 6",
      images: [
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765559911/IMG-20251212-WA0005_zih2hs.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765559567/IMG-20251212-WA0005_m15694.jpg",
      ],
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 13,
      name: "Secret Message candle",
      images: [
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765693352/WhatsApp_Image_2025-12-14_at_11.35.54_25299a2e_ob2pfw.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765819577/WhatsApp_Image_2025-12-14_at_11.34.47_5ecf6e6a_v3u49w.jpg",
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1765819682/WhatsApp_Image_2025-12-14_at_11.34.46_43521245_yxd1lq.jpg",
      ],
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        {" "}
        Premium Scented Candles
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const images = getProductImages(p);
          return (
            <div key={p.id} className="border p-4 rounded shadow">
              {images.length > 1 ? (
                <ProductCarousel
                  images={images}
                  onClick={() => openEnlarged(p)}
                />
              ) : (
                <img
                  src={images[0]}
                  alt={p.name}
                  onClick={() => openEnlarged(p)}
                  className="h-48 w-full object-cover rounded cursor-pointer"
                />
              )}

              <h2 className="mt-3 font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-700">{p.details}</p>

              <button
                onClick={() => openModal(p)}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded flex justify-center gap-2"
              >
                <FaWhatsapp /> Order on WhatsApp
              </button>
            </div>
          );
        })}
      </div>

      {/* Enlarged Viewer */}
      {enlarged.images.length > 0 && (
        <div
          onClick={() => setEnlarged({ images: [], index: 0 })}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
        >
          <img
            src={enlarged.images[enlarged.index]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ transform: `scale(${zoom})` }}
            className="max-h-[90vh] object-contain rounded"
          />
        </div>
      )}

      <WhatsAppOrderModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}

export default PremiumCandles