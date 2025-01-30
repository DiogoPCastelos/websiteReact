import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechStack from "./TechStack";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  faComputer,
  faMicrophone,
  faSailboat,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const baseURL = import.meta.env.BASE_URL;
  const fullName = "Diogo Piteira Castelos";
  const [displayedText, setDisplayedText] = useState("");
  const [isBlinking, setIsBlinking] = useState(true);

  // Typing effect animation
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullName.length) {
        setDisplayedText(fullName.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 800);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-full h-screen flex bg-cover bg-center px-10 lg:px-16"
      style={{ backgroundImage: `url('${baseURL}images/stars.webp')` }}
    >
      {/* Left Section - Name and Tech */}
      <div className="flex-1 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
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
        <p className="text-2xl lg:text-3xl mt-4 opacity-80">
          Full-Stack Developer
        </p>
        <p className="text-xl lg:text-2xl opacity-80">
          Mobile and Web Development
        </p>
        <TechStack />
      </div>

      {/* Right Section - Description */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        className="flex-1 flex flex-col justify-center text-white space-y-6 lg:space-y-8"
      >
        <p className="text-lg lg:text-xl leading-relaxed max-w-prose">
          Hi, my name is <strong>Diogo Piteira Castelos</strong>, a 21-year-old
          Computer Engineering student from Évora, Portugal, currently pursuing
          my <FontAwesomeIcon icon={faComputer} className="text-gray-300" />{" "}
          Engineering degree at the <strong>NOVA University of Lisbon</strong>.
          Alongside my studies, I work as a{" "}
          <strong>Full-Stack Mobile and Web Software Developer</strong> at{" "}
          <strong>In-Nova</strong>.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed max-w-prose">
          My passion lies in technology and software development, with a
          particular love for <strong>front-end development</strong>, where
          creativity meets functionality. Outside the tech world, I find
          inspiration in{" "}
          <FontAwesomeIcon icon={faSailboat} className="text-blue-300" />{" "}
          <strong>sailing</strong>,{" "}
          <FontAwesomeIcon icon={faMicrophone} className="text-red-300" />{" "}
          <strong>debating</strong>, and constantly seeking new challenges that
          push me to grow both personally and professionally.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed max-w-prose">
          Native in <strong>Portuguese</strong> and <strong>English</strong>,
          fluent in <strong>Spanish</strong> and <strong>French</strong>.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed max-w-prose">
          I’m actively looking for <strong>internships</strong> and{" "}
          <strong>job opportunities</strong> in software development, eager to
          contribute, learn, and innovate in dynamic and collaborative
          environments.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default About;
