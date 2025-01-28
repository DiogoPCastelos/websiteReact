import { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Cooldown in seconds
  const [isWaiting, setIsWaiting] = useState(false);

  // Handle cooldown countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the timer
    } else {
      setIsWaiting(false); // Reset waiting state
    }
  }, [cooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cooldown > 0) {
      setCooldown((prev) => prev + 10); // Add 10 seconds if waiting
      return;
    }

    setIsWaiting(true);
    setCooldown(10); // Start the cooldown timer

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_USER_ID // User ID
      )
      .then(
        (result) => {
          setSuccess(true);
          setError(false);
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          setSuccess(false);
          setError(true);
          console.error("Error sending email:", error);
        }
      );
  };

  return (
    <div className="flex flex-col text-textPrimary bg-gray-100 items-start space-y-4 p-6 rounded-3xl shadow-md">
      <h2 className="text-2xl font-bold">Contact Me</h2>
      <p>
        Feel free to send me a message! I’ll get back to you as soon as I can.
      </p>
      {success && (
        <p className="text-green-600">
          Your message has been sent successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600">
          Oops! Something went wrong. Please try again later.
        </p>
      )}
      {isWaiting && (
        <p className="text-yellow-500">
          Waiting... Please wait {cooldown} seconds before sending another
          email.
        </p>
      )}
      <form
        className="flex flex-col space-y-4 w-full"
        onSubmit={handleSubmit}
        disabled={isWaiting}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
          disabled={isWaiting}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
          disabled={isWaiting}
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
          disabled={isWaiting}
        ></textarea>
        <button
          type="submit"
          className={`${
            isWaiting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded transition`}
          disabled={isWaiting}
        >
          {isWaiting ? "Please Wait..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
