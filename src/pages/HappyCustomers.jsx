import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

const cards = [
  {
    id: 1,
    title: "5 Things to See at the Forbidden City",
    subtitle: "Explore the home of former emperors",
    image:
      "https://lh3.googleusercontent.com/ci/AL18g_Tam6R_IMJOp2_CA97RLkO9SyX97MItpiKFW-gugRAk6Z-piJ-JDWu8orlcJGnx8TDQDsJttwM=w800",
  },
  {
    id: 2,
    title: "Is 'The Kiss' Actually a Self-Portrait?",
    subtitle: "Zoom into the painting with The Belvedere",
    image:
      "https://lh3.googleusercontent.com/ci/AL18g_RTK9IPNbMGkM0aqysRNGGVdvuGi2p91SJxwjC5ebPCtUFvPbTFBZrJ57x_F1eKA0ivReEfq94=w800",
  },
  {
    id: 3,
    title: "7 Science Museums to Explore",
    subtitle: "From Washington D.C. to South Korea",
    image:
      "https://lh3.googleusercontent.com/ci/AL18g_RVXZEYqM0_UTOE4rlQngeM1Rz1UYKB3CAHH7Gz6wG0LIInKeStazubTKWmPgdLMfPHlFtcFnQ=w800",
  },
];

export default function HappyCustomers() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  /* 🔁 Auto slide */
  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => {
      setActive((a) => (a + 1) % cards.length);
    }, 3000);
    return () => clearInterval(i);
  }, [paused]);

  /* 📱 Swipe */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) setActive((a) => (a + 1) % cards.length);
    if (diff < -50)
      setActive((a) => (a - 1 + cards.length) % cards.length);
    touchStartX.current = null;
  };

  return (
    <main
      className="w-full bg-gray-100 py-6 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Helmet>
        <title>The Painted Dream - Happy Customers</title>
        <meta name="description" content="See what our happy customers say about our handcrafted art and gifts." />
      </Helmet>
      <section className="relative max-w-6xl mx-auto h-[380px] flex items-center justify-center px-3">

        {/* ⬅️ Desktop Arrow */}
        <button
          onClick={() =>
            setActive((a) => (a - 1 + cards.length) % cards.length)
          }
          className="hidden md:flex absolute left-2 z-20 bg-white/80 p-3 rounded-full shadow"
        >
          ◀
        </button>

        {/* Cards */}
        {cards.map((card, index) => {
          const offset = index - active;

          return (
            <div
              key={card.id}
              className="absolute transition-all duration-500"
              style={{
                transform:
                  window.innerWidth < 768
                    ? `translateX(${offset * 100}%)`
                    : `translateX(${offset * 140}px) scale(${
                        offset === 0 ? 1 : 0.85
                      })`,
                zIndex: offset === 0 ? 10 : 5,
                opacity: offset === 0 ? 1 : 0,
              }}
            >
              <div
                className="
                  w-[90vw] sm:w-[80vw] md:w-[320px]
                  h-[340px]
                  bg-white rounded-xl overflow-hidden shadow-xl
                "
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-[220px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* ➡️ Desktop Arrow */}
        <button
          onClick={() =>
            setActive((a) => (a + 1) % cards.length)
          }
          className="hidden md:flex absolute right-2 z-20 bg-white/80 p-3 rounded-full shadow"
        >
          ▶
        </button>
      </section>
    </main>
  );
}
  