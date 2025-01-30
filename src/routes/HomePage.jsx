import { useState, useRef, lazy, Suspense, useCallback } from "react";
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
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const [rotation, setRotation] = useState(360);

  // Scroll handlers
  const scrollToSection = useCallback((ref, offset = 0) => {
    if (ref.current) {
      const y =
        ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  // Toggle About section & rotate avatar
  const toggleAboutSection = () => {
    setAboutVisible(!aboutVisible);
    setRotation(aboutVisible ? 0 : 360);
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen text-textPrimary flex flex-col">
      {/* Topbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-[12vh] px-8 backdrop-blur-xl bg-opacity-10">
        <motion.button
          animate={{ rotate: rotation }}
          transition={{ duration: 1, ease: "easeOut" }}
          onClick={toggleAboutSection}
        >
          <img
            src={`${baseURL}images/ava.jpeg`}
            alt="Logo"
            className="h-[8vh] rounded-full shadow-lg"
          />
        </motion.button>
        <div className="flex space-x-6 text-lg font-medium">
          <button
            onClick={() =>
              scrollToSection(projectsRef, (12 * window.innerHeight) / 100)
            } // Scroll 24vh above projects
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
      <div className="flex-1 overflow-x-hidden">
        {/* About Section */}
        <AnimatePresence>
          {aboutVisible && (
            <motion.div
              initial={{ opacity: 0, y: 0, maxHeight: 0 }}
              animate={{ opacity: 1, y: 0, maxHeight: "100vh" }}
              exit={{ opacity: 0, y: 0, maxHeight: 0 }}
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

        {/* Other Sections */}
        <div className="flex flex-col space-y-12 items-center max-w-6xl mx-auto">
          {/* Projects Section */}
          <motion.div
            animate={{ paddingTop: aboutVisible ? "12vh" : "24vh" }}
            transition={{ duration: 1.3 }}
            ref={projectsRef}
            className="w-full"
          >
            <Suspense
              fallback={
                <div className="text-center text-gray-400">
                  Loading Projects...
                </div>
              }
            >
              <Projects />
            </Suspense>
          </motion.div>

          {/* Contact Section */}
          <div
            ref={contactRef}
            className="max-w-screen-lg opacity-100 max-h-[100vh] py-4"
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
            is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary"
            >
              CC BY-NC-SA 4.0
            </a>
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
