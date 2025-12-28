import React, { useState, useEffect,  } from "react";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppOrderModal({
  product,
  isOpen,
  onClose,
  userInfo,
  setUserInfo,
}) {
  const ADMIN_PHONE = "919030577270";
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

// --- Sub-Component: Product Carousel ---
// function ProductCarousel({ images = [], onClick }) {
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     if (!images || images.length <= 1) return;
//     const itv = setInterval(
//       () => setIndex((prev) => (prev + 1) % images.length),
//       2500
//     );
//     return () => clearInterval(itv);
//   }, [images]);

//   return (
//     <div className="relative w-full h-24 sm:h-48 overflow-hidden">
//       <img
//         src={images[index]}
//         className="w-full h-full object-cover cursor-pointer"
//         onClick={onClick}
//         alt="product"
//       />
//     </div>
//   );
// }
function ProductCarousel({ images = [], onClick }) {
  const [index, setIndex] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setIndex((p) => (p === 0 ? images.length - 1 : p - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setIndex((p) => (p + 1) % images.length);
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const itv = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 2500);
    return () => clearInterval(itv);
  }, [images]);

  return (
    <div className="relative w-full h-24 sm:h-48 overflow-hidden">
      <img
        src={images[index]}
        className="w-full h-full object-cover cursor-pointer"
        onClick={onClick}
        alt="product"
      />

      {/* ⬅ */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-1 top-1/2 -translate-y-1/2
                     bg-black/40 text-white px-2 py-1 rounded-full"
        >
          ❮
        </button>
      )}

      {/* ➡ */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-1 top-1/2 -translate-y-1/2
                     bg-black/40 text-white px-2 py-1 rounded-full"
        >
          ❯
        </button>
      )}
    </div>
  );
}


// --- Main Home Component ---
const MobHome = () => {
  const carouselImages = [
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999063/MAIN_rns2jm.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0002_ophrkn.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0004_t0sfko.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/0003_dgrnuj.jpg",
  ];

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
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999062/IMG-20250926-WA0019_mecorg.jpg",
      price: 60,
      details:
        "Each keychain costs 60/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 2,
      name: "Key chains",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999062/IMG-20250926-WA0012_elwxfj.jpg",
      price: 59,
      details:
        "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 3,
      name: "Key Chains",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999062/IMG-20250926-WA0009_t228dq.jpg",
      price: 59,
      details:
        "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 4,
      name: "Key Chains",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999061/IMG-20250926-WA0011_rfp8ge.jpg",
      price: 59,
      details:
        "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 5,
      name: "Key Chains",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999061/IMG-20250926-WA0010_b9vvgj.jpg",
      price: 59,
      details:
        "Each keychain costs 59/- rupees and Contact me for more quantity",
      category: "Key Chains",
    },
    {
      id: 6,
      name: "VINTAGE FRAMES",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999061/IMG-20250926-WA0005_dkcc1h.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Frames",
    },
    {
      id: 7,
      name: "3D MOON",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/IMG-20250926-WA0007_u1kj34.jpg",
      price: 500,
      details:
        "3d moon 6inch Wooden wall Moon light lamp Hand crafted 3d moon design",
      category: "Trending",
    },
    {
      id: 8,
      name: "3D MOON",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/IMG-20250926-WA0007_u1kj34.jpg",
      price: 1000,
      details:
        "3d moon 12inch Wooden wall Moon light lamp Hand crafted 3d moon design",
      category: "Trending",
    },
    {
      id: 9,
      name: "3D MOON",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758999060/IMG-20250926-WA0007_u1kj34.jpg",
      price: 1250,
      details:
        "3d moon 15inch Wooden wall Moon light lamp Hand crafted 3d moon design",
      category: "Trending",
    },
    {
      id: 10,
      name: "ROUND FRAME",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758912402/WhatsApp_Image_2025-09-26_at_23.59.31_453b090c_ytawq1.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 11,
      name: "Square Frame 2",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1758912388/WhatsApp_Image_2025-09-26_at_23.59.30_2d1e6a96_gfuosd.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
    {
      id: 12,
      name: "SQUARE FRAME",
      image:
        "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1759010363/WhatsApp_Image_2025-09-26_at_23.59.29_f3fb1a24_glh5iu_e31bec.jpg",
      price: "N/A",
      details: "CONTACT US for prize details and customization",
      category: "Trending",
    },
  ];









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
    <div className="bg-gray-50 min-h-screen pb-10">
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
        alt="banner"
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


      <div className="max-w-6xl mx-auto p-3">
        <h1 className="text-xl font-bold text-center my-4">Our Products</h1>

        {/* 🔒 2 COLUMNS ON MOBILE (Layout from MobHome) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {console.log(trendingProducts, "data from trendingproducts")}

          {trendingProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-sm border overflow-hidden flex flex-col"
            >
              {Array.isArray(p.images) ? (
                <ProductCarousel
                  images={p.images}
                  onClick={() => openEnlarged(p)}
                />
              ) : (
                <img
                  src={p.image}
                  className="h-24 sm:h-48 w-full object-cover cursor-pointer"
                  alt={p.name}
                  onClick={() => openEnlarged(p)}
                />
              )}

              <div className="p-2 flex flex-col flex-grow">
                <h3 className="text-[12px] sm:text-base font-bold truncate leading-tight">
                  {p.name}
                </h3>
                <p className="text-[10px] sm:text-sm text-gray-500 line-clamp-1 mb-1">
                  {p.details}

                </p>

                <p className="text-[11px] sm:text-sm font-bold text-green-700 mb-2">
                  {p.price === "N/A" ? "Contact us" : `₹${p.price}`}
                </p>

                <button
                  onClick={() => {
                    setSelectedProduct(p);
                    setIsModalOpen(true);
                  }}
                  className="mt-auto w-full bg-green-600 text-white text-[10px] sm:text-xs py-1.5 rounded flex items-center justify-center gap-1 active:scale-95 transition"
                >
                  <FaWhatsapp /> Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default MobHome;
