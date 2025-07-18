import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechStack from "./TechStack";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const today = new Date();
  const birthDate = new Date("2003-03-11");
  const age =
    (today.getMonth() == birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate()) ||
    today.getMonth() > birthDate.getMonth()
      ? today.getFullYear() - birthDate.getFullYear()
      : today.getFullYear() - birthDate.getFullYear() - 1;
  const fullName = "Diogo Piteira Castelos";
  const [displayedText, setDisplayedText] = useState("");
  const [isBlinking, setIsBlinking] = useState(true);
  const aboutRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullName.length) {
        setDisplayedText(fullName.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 800);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      ref={aboutRef} // Reference for measuring height
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full flex flex-col md:flex-row min-h-[99vh] bg-transparent px-4 sm:px-6 md:px-10 lg:px-16 h-auto py-6 pt-[12vh]"
    >
      {/* Left Section - Name and Tech */}
      <div className="flex-1 flex flex-col justify-center items-center text-white text-center px-4">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {displayedText}
          <motion.span
            animate={{ opacity: isBlinking ? 1 : 0 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            |
          </motion.span>
        </h1>
        <p
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 opacity-80"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Full-Stack Developer
        </p>
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-80"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Mobile and Web Development
        </p>
        <TechStack />
      </div>

      {/* Right Section - Description */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: window.outerWidth > 800 ? 30 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="flex-1 flex flex-col justify-center px-8 sm:px-0 text-white space-y-2 sm:space-y-4 lg:space-y-6 max-w-full"
      >
        <p
          className="sm:text-block text-xl leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Hi, my name is <strong>Diogo Piteira Castelos</strong>, a {age}
          -year-old Computer Engineering student from Évora, Portugal, currently
          pursuing my{" "}
          <FontAwesomeIcon icon={faComputer} className="text-gray-300" />{" "}
          Engineering degree at the <strong>NOVA University of Lisbon</strong>.
          Alongside my studies, I work as a{" "}
          <strong>Full-Stack Mobile and Web Software Developer</strong> at{" "}
          <strong>In-Nova</strong>.
        </p>

        <p
          className="hidden sm:block text-xl leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          I am actively looking for <strong>internships</strong> and{" "}
          <strong>job opportunities</strong> in software development, eager to
          contribute, learn, and innovate in dynamic and collaborative
          environments.
        </p>
        <p
          className="italic text-blue-200 sm:block text-xl leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          They say the sky is never the same twice—just like this page. Refresh,
          and you will get a brand-new sky. Unique to this moment in time we are
          sharing.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
