
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import CandleGallery from "./pages/CandleGallery";
import HappyCustomers from "./pages/HappyCustomers";
import LuxuryBirthdayGiftModal from "./features/home/components/LuxuryBirthdayGiftPoster";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowModal(true), 500); // opens after app loads
  }, []);

  return (
    <>
      <Navbar />

      {/* Popup on app start */}
      <LuxuryBirthdayGiftModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/candleGallery" element={<CandleGallery />} />
        <Route path="/happyCustomers" element={<HappyCustomers />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
