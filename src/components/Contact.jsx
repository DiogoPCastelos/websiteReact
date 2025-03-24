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

  // Handle cooldown countdown
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

  // Expand/collapse smoothly
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
    <motion.div
      ref={contactRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative flex flex-col w-full max-w-lg mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Clickable Header */}
      <motion.div
        onClick={toggleContact}
        className="cursor-pointer bg-gray-800 px-6 py-4 flex justify-between items-center text-white text-xl font-semibold tracking-wide hover:bg-gray-700 transition rounded-2xl"
        style={{ border: "none", boxShadow: "none" }} // Ensures no border
      >
        Contact Me
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-lg"
        >
          ▼
        </motion.span>
      </motion.div>

      {/* Collapsible Content */}
      <motion.div
        animate={{
          maxHeight: isExpanded ? "500px" : "0px", // Max height instead of height
          opacity: isExpanded ? 1 : 0,
          marginBottom: isExpanded ? "24px" : "0px", // Prevents page jump
          padding: isExpanded ? "24px" : "0px",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
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
            className="bg-transparent border-b border-white/30 text-white text-lg focus:outline-none focus:border-primary transition p-2"
            required
            disabled={isWaiting}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent border-b border-white/30 text-white text-lg focus:outline-none focus:border-primary transition p-2"
            required
            disabled={isWaiting}
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="bg-transparent border-b border-white/30 text-white text-lg focus:outline-none focus:border-primary transition p-2"
            required
            disabled={isWaiting}
          ></textarea>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
              isWaiting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-secondary hover:bg-opacity-80"
            } hover:bg-primary text-white`}
            disabled={isWaiting}
          >
            {isWaiting ? "Please Wait..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
