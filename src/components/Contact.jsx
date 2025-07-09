import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsWaiting(false);
    }
  }, [cooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cooldown > 0) {
      setCooldown((prev) => prev + 10);
      return;
    }

    setIsWaiting(true);
    setCooldown(10);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: "Diogo Castelos",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setSuccess(false);
          setError(true);
          console.error("Error sending email:", error);
        }
      );
  };

  const toggleContact = () => {
    setIsExpanded((prev) => {
      const newState = !prev;
      if (newState && contactRef.current) {
        setTimeout(() => {
          contactRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      }
      return newState;
    });
  };

  return (
    <div
      ref={contactRef}
      className={`relative flex flex-col w-full max-w-lg mx-auto
    bg-white/5 backdrop-blur-[25px] rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]
    border border-white/25 overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/30 before:to-transparent
    before:opacity-40 before:pointer-events-none before:rounded-3xl
  `}
    >
      {/* Clickable Header */}
      <div
        onClick={toggleContact}
        className="relative z-20 cursor-pointer
          bg-white/10 backdrop-blur-lg drop-shadow border border-white/30
          px-6 py-4 flex justify-between items-center text-white text-xl font-semibold tracking-wide
          hover:bg-white/20 transition rounded-3xl select-none"
        style={{
          WebkitBackdropFilter: "blur(15px)",
          backdropFilter: "blur(15px)",
        }}
      >
        Contact Me
        <span
          className={`text-lg inline-block transition-transform duration-300 ease-out ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </div>

      {/* Collapsible Content */}
      <div
        className={`relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded
            ? "max-h-[500px] opacity-100 mb-6 p-6"
            : "max-h-0 opacity-0 mb-0 p-0"
        }`}
      >
        <p className="text-white text-opacity-80 text-lg text-center">
          Feel free to reach out. I’ll get back to you as soon as possible!
        </p>

        {success && (
          <p className="text-green-400 text-center mt-2">
            ✔ Message sent successfully!
          </p>
        )}
        {error && (
          <p className="text-red-400 text-center mt-2">
            ✖ Something went wrong. Please try again.
          </p>
        )}
        {isWaiting && (
          <p className="text-yellow-400 text-center mt-2">
            ⏳ Please wait {cooldown} seconds before resending.
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5 mt-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/10 backdrop-blur-md border-b border-white/30
              text-white placeholder-white/70 text-lg
              focus:outline-none focus:border-green-400 transition p-2 rounded-md"
            required
            disabled={isWaiting}
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white/10 backdrop-blur-md border-b border-white/30
              text-white placeholder-white/70 text-lg
              focus:outline-none focus:border-green-400 transition p-2 rounded-md"
            required
            disabled={isWaiting}
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
            }}
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="bg-white/10 backdrop-blur-md border-b border-white/30
              text-white placeholder-white/70 text-lg
              focus:outline-none focus:border-green-400 transition p-2 rounded-md resize-none"
            required
            disabled={isWaiting}
            style={{
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
            }}
          ></textarea>
          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-lg font-semibold transition
              ${
                isWaiting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 bg-opacity-80 hover:bg-opacity-100"
              } text-white shadow-lg`}
            disabled={isWaiting}
          >
            {isWaiting ? "Please Wait..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
