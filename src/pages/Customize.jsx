import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const Customize = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    details: "",
    referenceImageUrl: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.match(/^[0-9]{10}$/))
      return "Enter a valid 10-digit phone number";
    if (!form.whatsapp.match(/^[0-9]{10}$/))
      return "Enter a valid 10-digit WhatsApp number";
    if (!form.details.trim()) return "Please describe your custom art";
    return null;
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    const adminNumber = "919603655683"; // Replace with your WhatsApp number

    const text = `🎨 *New Custom Art Request* 🎨

👤 *Name:* ${form.name}
📞 *Phone:* ${form.phone}
💬 *WhatsApp:* ${form.whatsapp}

🖌️ *Details:*
${form.details}

🖼️ *Reference Image:*
${form.referenceImageUrl || "N/A"}`;

    // Encode message to preserve line breaks
    const encodedText = encodeURIComponent(text);

    // Detect mobile vs desktop
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${adminNumber}&text=${encodedText}` // mobile app
      : `https://wa.me/${adminNumber}?text=${encodedText}`; // web

    // Open WhatsApp chat
    window.open(whatsappURL, "_blank");

    // Reset form and show success message
    setForm({
      name: "",
      phone: "",
      whatsapp: "",
      details: "",
      referenceImageUrl: "",
    });
    setMessage({
      type: "success",
      text: "Request sent to admin via WhatsApp ✅",
    });
  };

  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
    <form className="w-full max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
      <Helmet>
        <title>The Painted Dream - Customize</title>
        <meta name="description" content="Request your custom painting or handmade gift. Share your details and we'll create magic." />
      </Helmet>
      <h1 className="text-2xl font-bold mb-2 text-center">🎨 Customize Your Order</h1>

      {message.text && (
        <div
          className={`p-3 rounded-lg text-sm ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <input
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Your Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        className="w-full border rounded-lg px-3 py-2"
        placeholder="WhatsApp Number"
        name="whatsapp"
        value={form.whatsapp}
        onChange={handleChange}
      />
      <textarea
        className="w-full border rounded-lg px-3 py-2"
        rows="4"
        placeholder="Describe your custom art (size, colors, pattern)..."
        name="details"
        value={form.details}
        onChange={handleChange}
      />
      <input
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Reference Image URL (optional)"
        name="referenceImageUrl"
        value={form.referenceImageUrl}
        onChange={handleChange}
      />

      <button
        onClick={handleWhatsAppClick}
        className="w-full rounded-lg py-2 bg-green-500 hover:bg-green-600 text-white font-semibold transition"
      >
        Send details on WhatsApp
      </button>
    </form>
    </main>
  );
}

export default Customize