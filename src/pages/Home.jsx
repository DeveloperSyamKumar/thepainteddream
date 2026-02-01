import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCarousel from "../components/common/ProductCarousel";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";

function WhatsAppOrderModal({
  product,
  isOpen,
  onClose,
  userInfo,
  setUserInfo,
}) {
  const ADMIN_PHONE = "919603655683";
  if (!isOpen) return null;

  const handleChange = (e) =>
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

  const imageForMessage = Array.isArray(product?.images)
    ? product.images[0]
    : product?.image;

  const handleSendWhatsApp = () => {
    const pageUrl = window.location.href;
    const priceText =
      product.price === "N/A" || product.price === "  N/A"
        ? "Please share the price and available customization options."
        : `₹${product.price}`;

    const message = `🛍️ *THE PAINTED DREAM ORDER INQUIRY* 🛍️\n\nHello! 👋 I'd like to order:\n\n👤 *Name:* ${
      userInfo.name || "Not provided"
    }\n📞 *Phone:* ${userInfo.phone || "Not provided"}\n\n🖼️ *Product:* ${
      product.name
    }\n💰 *Price:* ${priceText}\n📄 *Details:* ${
      product.details
    }\n\n🖼️ *Image:* ${
      imageForMessage || "Not provided"
    }\n🌐 *Page:* ${pageUrl}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(
          message
        )}`
      : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-3 right-3 text-gray-600 text-xl"
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
          <FaWhatsapp size={18} /> Send on WhatsApp
        </button>
      </div>
    </div>
  );
}

// ProductCarousel removed (imported)




const Home = () => {
    const { addToCart, toggleCart } = useCart();
  const carouselImages = [
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999063/MAIN_rns2jm.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0002_ophrkn.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0004_t0sfko.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0003_dgrnuj.jpg",
  ];

  const [trendingProducts, setTrendingProducts] = useState(
    products.filter((p) => p.sourcePage === "home")
  );
  
  // State
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enlarged, setEnlarged] = useState({ images: [], index: 0 });
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "" };
  });

  // Hero Auto-slide
  useEffect(() => {
    const itv = setInterval(
      () => setHeroIndex((p) => (p + 1) % carouselImages.length),
      4000
    );
    return () => clearInterval(itv);
  }, []);

  const openEnlarged = (p, idx = 0) => {
    const imgs = Array.isArray(p.images) ? p.images : [p.image];
    setEnlarged({ images: imgs, index: idx });
  };



  const prevHero = () =>
  setHeroIndex((p) => (p === 0 ? carouselImages.length - 1 : p - 1));

const nextHero = () =>
  setHeroIndex((p) => (p + 1) % carouselImages.length);


  return (
    <main className="bg-gray-50 min-h-screen pb-10">
      <Helmet>
        <title>The Painted Dream - Home</title>
        <meta name="description" content="Discover handcrafted gifts, mandala art, and custom frames at The Painted Dream." />
      </Helmet>
      {/* Hero Carousel */}
      {/* <div className="relative w-full h-44 sm:h-80 overflow-hidden shadow-md">
        <div
          className="flex transition-transform duration-700 h-full"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {carouselImages.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full flex-shrink-0 object-cover h-full"
              alt="banner"
            />
          ))}
        </div>
      </div> */}

      <div className="relative w-full h-44 sm:h-80 overflow-hidden shadow-md">
  <div
    className="flex transition-transform duration-700 h-full"
    style={{ transform: `translateX(-${heroIndex * 100}%)` }}
  >
    {carouselImages.map((img, i) => (
      <img
        key={i}
        src={img}
        className="w-full flex-shrink-0 object-cover h-full"
        alt="The Painted Dream featured banner"
        loading={i === 0 ? "eager" : "lazy"}
      />
    ))}
  </div>

  {/* ⬅ LEFT ARROW */}
  <button
    onClick={prevHero}
    className="absolute left-2 top-1/2 -translate-y-1/2
               bg-black/40 text-white p-2 rounded-full
               hover:bg-black/60 z-10"
  >
    ❮
  </button>

  {/* ➡ RIGHT ARROW */}
  <button
    onClick={nextHero}
    className="absolute right-2 top-1/2 -translate-y-1/2
               bg-black/40 text-white p-2 rounded-full
               hover:bg-black/60 z-10"
  >
    ❯
  </button>
</div>


      <section className="max-w-6xl mx-auto p-3">
        <h1 className="text-xl font-bold text-center my-4">Our Products</h1>

        {/* 🔒 2 COLUMNS ON MOBILE (Layout from MobHome) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">


          {trendingProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col"
            >
              <Link to={`/product/${p.id}`} className="block relative group">
                {Array.isArray(p.images) ? (
                  <ProductCarousel
                    images={p.images}
                    altText={p.name}
                    className="h-24 sm:h-48"
                  />
                ) : (
                  <img
                    src={p.image}
                    className="h-24 sm:h-48 w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                    alt={`${p.name} - ${p.category}`}
                    loading="lazy"
                  />
                )}
              </Link>

              <div className="p-2 flex flex-col flex-grow">
                <Link to={`/product/${p.id}`}>
                  <h3 className="text-[12px] sm:text-base font-bold truncate leading-tight hover:text-green-600 transition">
                    {p.name}
                  </h3>
                </Link>
                <p className="text-[10px] sm:text-sm text-gray-500 line-clamp-1 mb-1">
                  {p.details}

                </p>

                <p className="text-[11px] sm:text-sm font-bold text-green-700 mb-2">
                  {p.price === "N/A" ? "Contact us" : `₹${p.price}`}
                </p>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => addToCart(p)}
                    className="flex-1 bg-red-600 text-white text-[10px] sm:text-xs py-1.5 rounded flex items-center justify-center gap-1 active:scale-95 transition hover:bg-red-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                        addToCart(p);
                        toggleCart(true);
                      // setSelectedProduct(p);
                      // setIsModalOpen(true);
                    }}
                    className="flex-1 bg-green-600 text-white text-[10px] sm:text-xs py-1.5 rounded flex items-center justify-center gap-1 active:scale-95 transition hover:bg-green-700"
                  >
                    <FaWhatsapp /> Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enlarged Viewer */}
    


{enlarged.images.length > 0 && (
  <div
    className="fixed inset-0 bg-black/90 z-[110] flex items-center justify-center p-4"
    onClick={() => setEnlarged({ images: [], index: 0 })}
  >
    <div
      className="relative w-full max-w-4xl flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ⬅ LEFT ARROW */}
      {enlarged.images.length > 1 && (
        <button
          onClick={() =>
            setEnlarged((prev) => ({
              ...prev,
              index:
                prev.index === 0
                  ? prev.images.length - 1
                  : prev.index - 1,
            }))
          }
          className="absolute left-2 top-1/2 -translate-y-1/2
                     bg-black/50 text-white text-2xl
                     p-3 rounded-full hover:bg-black/70"
        >
          ❮
        </button>
      )}

      {/* IMAGE */}
      <img
        src={enlarged.images[enlarged.index]}
        className="max-w-full max-h-[80vh] object-contain rounded-lg"
        alt="enlarged"
      />

      {/* ➡ RIGHT ARROW */}
      {enlarged.images.length > 1 && (
        <button
          onClick={() =>
            setEnlarged((prev) => ({
              ...prev,
              index: (prev.index + 1) % prev.images.length,
            }))
          }
          className="absolute right-2 top-1/2 -translate-y-1/2
                     bg-black/50 text-white text-2xl
                     p-3 rounded-full hover:bg-black/70"
        >
          ❯
        </button>
      )}

      {/* CLOSE TEXT */}
      <p className="absolute bottom-6 text-white text-sm font-light italic">
        Tap outside to close
      </p>
    </div>
  </div>
)}

      {/* WhatsApp Modal */}
      <WhatsAppOrderModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          localStorage.setItem("whatsappUserInfo", JSON.stringify(userInfo));
        }}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </main>
  );
};

export default Home;
