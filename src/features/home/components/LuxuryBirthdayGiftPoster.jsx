import { useEffect, useState } from "react";

export default function LuxuryBirthdayGiftModal({ isOpen, onClose }) {
  const images = [
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1762534677/likki_01_nifvff.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763579906/likki_03_pdy961.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [touchX, setTouchX] = useState(null);
  const [selectedOption, setSelectedOption] = useState("preloaded");

  useEffect(() => {
    if (isOpen) {
      setIndex(0);
      setScale(1);
      setSelectedOption("preloaded");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  const onWheel = (e) => {
    e.preventDefault();
    setScale((s) =>
      Math.min(Math.max(s + (e.deltaY < 0 ? 0.15 : -0.15), 1), 3)
    );
  };

  const onTouchStart = (e) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (!touchX) return;
    const diff = touchX - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchX(null);
  };

  const whatsappMessage =
    selectedOption === "preloaded"
      ? `Hi Painted Dream Team 👋

I’m interested in the *Pre-Loaded Luxury Birthday Gift Box* 🎁.

Please share:
• Price details
• Items included
• Delivery timeline

Thank you!`
      : `Hi Painted Dream Team 👋

I’d like to order a *Customized Luxury Birthday Gift Box* ✨.

I want to customize:
• Photos
• Personal message
• Theme

Please guide me with pricing and process.

Thank you!`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-yellow-400/30 shadow-2xl bg-gradient-to-b from-[#1a1208] to-[#0f0b06]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center p-5 bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1a1208]">
          <h1 className="text-xl font-bold">Luxury Birthday Gift Box</h1>
          <p className="text-xs font-medium mt-1">
            Elegant • Personalized • Premium
          </p>
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center p-4">
          <img
            src={images[index]}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ transform: `scale(${scale})` }}
            className="h-64 rounded-xl transition-transform duration-200"
            alt="Gift"
          />

          <button
            onClick={prev}
            className="absolute left-2 text-white text-3xl"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 text-white text-3xl"
          >
            ›
          </button>
        </div>

        {/* Options */}
        <div className="px-4 pb-4 space-y-3">
          {/* Pre-Loaded */}
          <div
            onClick={() => setSelectedOption("preloaded")}
            className={`flex items-start gap-3 cursor-pointer rounded-xl border p-3 transition ${
              selectedOption === "preloaded"
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-yellow-400/30 bg-white/5"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedOption === "preloaded"}
              readOnly
              className="mt-1 accent-yellow-400"
            />
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold">
                🎁 Pre-Loaded Gift Box
              </h3>
              <p className="text-gray-300 text-xs mt-1">
                Curated premium items with elegant packaging
              </p>
            </div>
          </div>

          {/* Customized */}
          <div
            onClick={() => setSelectedOption("customized")}
            className={`flex items-start gap-3 cursor-pointer rounded-xl border p-3 transition ${
              selectedOption === "customized"
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-yellow-400/30 bg-white/5"
            }`}
          >
            <input
              type="checkbox"
              checked={selectedOption === "customized"}
              readOnly
              className="mt-1 accent-yellow-400"
            />
            <div>
              <h3 className="text-yellow-300 text-sm font-semibold">
                ✨ Customized Gift Box
              </h3>
              <p className="text-gray-300 text-xs mt-1">
                Photos, messages & themes of your choice
              </p>
            </div>
          </div>

         {/* WhatsApp */}
          <a
            href={`https://wa.me/919603655683?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1a1208] font-bold py-3 rounded-xl"
          >
            💬 Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
