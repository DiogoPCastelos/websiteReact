import { useState, useRef, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { About, Projects, Contact } from "../components";

function HomePage() {
  const baseURL = import.meta.env.BASE_URL;
  const [aboutVisible, setAboutVisible] = useState(true);
  const [rotation, setRotation] = useState(360);
  const [aboutHeight, setAboutHeight] = useState("100vh");

  const canvasRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAboutHeight("unset");
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  const toggleAboutSection = () => {
    setAboutVisible((prev) => {
      setAboutHeight(prev ? 0 : "auto");
      if (!prev) {
        scrollToSection(aboutRef, (12 * window.innerHeight) / 100);
      }
      setRotation(prev ? 0 : 360);

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

  const scrollToSection = useCallback((ref, offset = 0) => {
    if (ref.current) {
      const y =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    const timeout = setTimeout(() => {
      let stars = [];

      const width = window.innerWidth;
      const totalHeight = Math.max(
        document.documentElement.scrollHeight,
        window.innerHeight
      );

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(totalHeight * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = totalHeight + "px";

      ctx.scale(dpr, dpr);

      const getRandomColor = () => {
        const colors = [
          "rgba(173, 216, 230, 1)",
          "rgba(129, 148, 132, 1)",
          "rgba(255, 255, 224, 1)",
          "rgba(252, 227, 151, 1)",
          "rgba(255, 250, 250, 1)",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      };

      const count = width > 1000 ? 5000 : width > 800 ? 2000 : 500;
      stars = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * totalHeight,
        size: Math.random() * 2.5 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.001 + 0.002,
        color: getRandomColor(),
      }));

      const drawStars = () => {
        // Fill the canvas with black
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, totalHeight);

        ctx.save();
        ctx.translate(width / 2, totalHeight / 2);
        ctx.translate(-width / 2, -totalHeight / 2);

        const scrollY = window.scrollY;
        stars.forEach((star) => {
          const yOffset = star.y - scrollY * 0.2;
          const twinkle = Math.sin(Date.now() * star.twinkleSpeed) * 0.5 + 0.5;
          ctx.fillStyle = star.color.replace(
            "1)",
            `${star.brightness * twinkle})`
          );
          ctx.beginPath();
          ctx.arc(
            star.x,
            (yOffset + totalHeight) % totalHeight,
            star.size * (twinkle + 0.5),
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        ctx.restore();
        requestAnimationFrame(drawStars);
      };

      drawStars();
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden text-textPrimary flex flex-col">
      <div className="relative bg-black min-h-screen overflow-x-hidden text-textPrimary flex flex-col">
        {/* ⭐ Canvas Background (Behind Topbar) */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full bg-black block blur-[3px] pointer-events-none z-[10]"
        />

        {/* Topbar (Now Above Starfield) */}
        <nav
          className="fixed top-5 left-1/2 -translate-x-1/2 w-[95%] z-50 h-[12vh] px-8 flex justify-between items-center
  backdrop-blur-[1px] rounded-3xl border-b-[0.2px] border-r-[0.2px] bg-white/2 border-white/30 shadow-[inset_0.5px_1px_0px_rgba(255,255,255,0.6)] overflow-hidden
  before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-[url('/images/figma_texture_glass.png')] before:opacity-20 before:pointer-events-none before:mix-blend-lighten
"
        >
          <button
            onClick={toggleAboutSection}
            className={`relative z-10 transition-transform duration-1000 ease-out ${
              rotation === 360 ? "rotate-[360deg]" : "rotate-0"
            }`}
          >
            <img
              src={`${baseURL}images/ava.webp`}
              alt="Logo"
              className="h-[8vh] rounded-full shadow-inner border border-white/30 backdrop-blur-md"
            />
          </button>

          <div className="relative z-10 flex space-x-4 text-base font-semibold text-white">
            <button
              onClick={() =>
                scrollToSection(projectsRef, (12 * window.innerHeight) / 100)
              }
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-transparent transition-all duration-300 backdrop-blur-md border border-white/20 shadow-inner shadow-white shadow-sm"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-transparent transition-all duration-300 backdrop-blur-md border border-white/20 shadow-inner shadow-white shadow-sm"
            >
              Contact
            </button>
            <a
              href={`${baseURL}/docs/CV - Diogo Piteira Castelos.pdf`}
              download
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-transparent transition-all duration-300 backdrop-blur-md border border-white/20 shadow-inner shadow-white shadow-sm"
            >
              CV
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-col mx-0 md:pt-0 pt-12 justify-center overflow-hidden relative z-10">
          <AnimatePresence>
            {aboutVisible && (
              <motion.div
                ref={aboutRef}
                initial={{ opacity: 0, height: 0 }} // Start collapsed
                animate={{ opacity: 1, height: aboutHeight }} // 100vh -> auto
                exit={{ opacity: 0, height: 0 }} // Collapse smoothly
                transition={{ duration: 1, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <About />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Section */}
          <div
            ref={projectsRef}
            className={`w-full px-4 transition-all duration-1000 ease-in-out ${
              aboutVisible ? "pt-[12vh]" : "pt-[16vh]"
            }`}
          >
            <Projects />
          </div>

          {/* Contact Section */}
          <div
            ref={contactRef}
            className="max-w-screen-lg opacity-100 max-h-[100vh] mx-auto pt-24 py-4"
          >
            <Contact />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center z-50 py-4">
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
              is licensed under <a className="font-bold">CC BY-NC-SA 4.0</a>.
            </p>
          </div>
          <div className="text-sm text-gray-400">
            Made with Vite <FontAwesomeIcon icon={faReact} /> + TailwindCSS
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;
