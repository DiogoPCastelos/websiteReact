import {
  useState,
  useRef,
  lazy,
  Suspense,
  useCallback,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Lazy Load Components
const About = lazy(() => import("../components/About"));
const Projects = lazy(() => import("../components/Projects"));
const Contact = lazy(() => import("../components/Contact"));

function HomePage() {
  const baseURL = import.meta.env.BASE_URL;
  const [aboutVisible, setAboutVisible] = useState(true);
  const [rotation, setRotation] = useState(360);
  const canvasRef = useRef(null);
  const [aboutHeight, setAboutHeight] = useState("100vh"); // Start at 100vh

  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    // After a small delay, transition from 100vh to auto
    const timeout = setTimeout(() => {
      setAboutHeight("auto");
    }, 300); // Adjust delay if necessary
    return () => clearTimeout(timeout);
  }, []);

  const toggleAboutSection = () => {
    setAboutVisible((prev) => {
      setAboutHeight(aboutVisible ? 0 : "auto");
      aboutVisible
        ? ""
        : scrollToSection(aboutRef, (12 * window.innerHeight) / 100);
      setRotation(aboutVisible ? 0 : 360);
      const newState = !prev;
      if (newState) {
        setTimeout(
          () => scrollToSection(aboutRef, (12 * window.innerHeight) / 100),
          300
        );
      }
      return newState;
    });
  };

  // Scroll handlers
  const scrollToSection = useCallback((ref, offset = 0) => {
    if (ref.current) {
      const y =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // ⭐ Canvas-Based Starfield Background with Fixed Star Positions ⭐
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];

    const totalHeight =
      document.documentElement.scrollHeight || window.innerHeight;

    // 🔹 Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = totalHeight;

    const getRandomColor = () => {
      const colors = [
        "rgba(173, 216, 230, 1)", // Light blue
        "rgba(129, 148, 132, 1)", // Light green
        "rgba(255, 255, 224, 1)", // Yellow
        "rgba(252, 227, 151, 1)", // Orange
        "rgba(255, 250, 250, 1)", // Soft white
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const generateStars = () => {
      stars = Array.from({
        length: canvas.width > 1000 ? 5000 : canvas.width > 800 ? 2000 : 750,
      }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * totalHeight,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.002 + 0.0001,
        color: getRandomColor(),
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ⭐ Rotate canvas by 180 degrees (or change this angle as needed)
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2); // Move to center
      ctx.translate(-canvas.width / 2, -canvas.height / 2); // Move back

      const scrollY = window.scrollY; // Current page scroll

      stars.forEach((star) => {
        const yOffset = star.y - scrollY * 0.2; // 🔥 Reverse scroll effect
        const twinkle = Math.sin(Date.now() * star.twinkleSpeed) * 0.5 + 0.5;
        ctx.fillStyle = star.color.replace(
          "1)",
          `${star.brightness * twinkle})`
        );
        ctx.beginPath();
        ctx.arc(
          star.x,
          (yOffset + canvas.height) % canvas.height, // Ensure stars loop correctly
          star.size * (twinkle + 0.5),
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.restore(); // Reset transformation

      requestAnimationFrame(drawStars);
    };

    generateStars();
    drawStars();
  }, []); // Runs only once

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden text-textPrimary flex flex-col">
      {/* ⭐ Canvas Background (Behind Topbar) */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full blur-[1px] pointer-events-none z-[10]"
      />

      {/* Topbar (Now Above Starfield) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent flex justify-between items-center h-[12vh] px-8 backdrop-blur-xl bg-opacity-10">
        <motion.button
          animate={{ rotate: rotation }}
          transition={{ duration: 1, ease: "easeOut" }}
          onClick={toggleAboutSection}
        >
          <img
            src={`${baseURL}images/ava.webp`}
            alt="Logo"
            className="h-[8vh] rounded-full shadow-lg"
          />
        </motion.button>
        <div className="flex space-x-6 text-lg font-medium">
          <button
            onClick={() =>
              scrollToSection(projectsRef, (12 * window.innerHeight) / 100)
            }
            className="nav-button"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection(contactRef)}
            className="nav-button"
          >
            Contact
          </button>
          <a
            href={`${baseURL}/docs/CV - Diogo Piteira Castelos.pdf`}
            download
            className="nav-button hover:text-green-500"
          >
            CV
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-col mx-0 justify-center overflow-hidden relative z-10">
        <AnimatePresence>
          {aboutVisible && (
            <motion.div
              ref={aboutRef}
              initial={{ opacity: 0, height: 0 }} // Start collapsed
              animate={{ opacity: 1, height: aboutHeight }} // First 100vh, then auto
              exit={{ opacity: 0, height: 0 }} // Collapse smoothly
              transition={{ duration: 1, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Suspense
                fallback={
                  <div className="text-center text-gray-400">
                    Loading About...
                  </div>
                }
              >
                <About />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Section */}
        <motion.div
          animate={{ paddingTop: aboutVisible ? "12vh" : "16vh" }}
          transition={{ duration: 1.3 }}
          ref={projectsRef}
          className="w-full mx-0"
        >
          <Suspense
            fallback={<div className="text-gray-400">Loading Projects...</div>}
          >
            <Projects />
          </Suspense>
        </motion.div>

        {/* Contact Section */}
        <div
          ref={contactRef}
          className="max-w-screen-lg opacity-100 max-h-[100vh] mx-auto py-4"
        >
          <Suspense
            fallback={
              <div className="text-center text-gray-400">
                Loading Contact...
              </div>
            }
          >
            <Contact />
          </Suspense>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4">
        <div className="flex justify-center space-x-6 mb-2">
          <FontAwesomeIcon
            size="3x"
            color="white"
            icon={faLinkedin}
            onClick={() =>
              window.open("https://www.linkedin.com/in/diogopcastelos/")
            }
            className="cursor-pointer hover:text-secondary"
          />
          <FontAwesomeIcon
            size="3x"
            color="white"
            icon={faGithub}
            onClick={() => window.open("https://github.com/DiogoPCastelos/")}
            className="cursor-pointer hover:text-secondary"
          />
          <FontAwesomeIcon
            size="3x"
            color="white"
            icon={faInstagram}
            onClick={() =>
              window.open("https://www.instagram.com/diogopcastelos/")
            }
            className="cursor-pointer hover:text-secondary"
          />
        </div>

        {/* License Section */}
        <div className="flex pt-2 flex-row justify-center">
          <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
            alt="CC"
          />
          <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
            alt="BY"
          />
          <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
            alt="NC"
          />
          <img
            style={{
              height: "22px",
              marginLeft: "3px",
              verticalAlign: "text-bottom",
            }}
            src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
            alt="SA"
          />
        </div>
        <div className="text-sm text-gray-500">
          <p>
            <a
              property="dct:title"
              rel="cc:attributionURL"
              href="https://github.com/DiogoPCastelos/websiteReact/tree/main"
              className="hover:text-secondary"
            >
              DiogoPCastelos/websiteReact
            </a>{" "}
            by{" "}
            <a
              rel="cc:attributionURL dct:creator"
              property="cc:attributionName"
              href="https://github.com/DiogoPCastelos"
              className="hover:text-secondary"
            >
              Diogo Piteira Castelos
            </a>{" "}
            is licensed under **CC BY-NC-SA 4.0**.
          </p>
        </div>
        <div className="text-sm text-gray-400">
          Made with Vite <FontAwesomeIcon icon={faReact} /> + TailwindCSS
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
