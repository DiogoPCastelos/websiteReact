import { useState, useRef } from "react";
import { About, Projects, Contact } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

function HomePage() {
  const baseURL = import.meta.env.BASE_URL;
  const [about, setAbout] = useState(true);
  const [direction, setDirection] = useState(true);
  // References to Projects and Contact sections
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Handlers to toggle visibility
  const aboutHandler = () => {
    setAbout(!about);
    setDirection(!direction);
  };
  const projectsHandler = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const contactHandler = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [rotation, setRotation] = useState(0);

  const rotateAvaHandler = () => {
    direction ? setRotation(rotation - 360) : setRotation(rotation + 360);
  };

  return (
    <div className="relative bg-background min-h-screen text-textPrimary flex flex-col">
      {/* Topbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-[12vh] px-6">
        <motion.button
          animate={{ rotate: rotation + 360 }}
          transition={{ duration: 1 }}
          onClick={() => {
            aboutHandler();
            rotateAvaHandler();
          }}
        >
          <img
            src={`${baseURL}images/ava.jpeg`}
            alt="Logo"
            className="h-[8vh] rounded-full"
          />
        </motion.button>
        <div className="flex space-x-6">
          <button
            onClick={projectsHandler}
            className="hover:font-bold transition-transform duration-300 text-secondary font-semibold hover:text-purple-100"
          >
            Projects
          </button>
          <button
            onClick={contactHandler}
            className="hover:font-bold font-semibold transition-transform duration-300 text-secondary hover:text-purple-100"
          >
            Contact
          </button>
          <a
            href={`${baseURL}/docs/CV - Diogo Piteira Castelos.pdf`}
            download
            className="hover:font-bold font-semibold transition-transform duration-300 text-secondary hover:text-green-500"
          >
            CV
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        {/* About Section */}
        <AnimatePresence>
          {about && (
            <motion.div
              initial={{ opacity: 0, y: 0, maxHeight: 0 }}
              animate={{
                opacity: 1,
                y: about ? "0" : "-100",
                maxHeight: "100vh",
              }}
              exit={{ opacity: 0, y: 0, maxHeight: 0 }}
              transition={{ duration: 1, ease: "easeInOut", bounce: 100 }}
              className="overflow-hidden"
            >
              <About />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Other Sections */}
        <div className="flex flex-col space-y-6 items-center max-w-screen mx-auto">
          {/* Projects Section */}
          <motion.div
            animate={{ paddingTop: about ? "0" : "12vh" }}
            transition={{ duration: 1.3 }}
            ref={projectsRef}
            className="w-screen"
          >
            <Projects />
          </motion.div>
          {/* Contact Section */}
          <div
            ref={contactRef}
            className="max-w-screen-lg opacity-100 max-h-[100vh] py-4"
          >
            <Contact />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background text-center py-4">
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

        <div className="text-sm text-gray-400">
          Made with Vite <FontAwesomeIcon icon={faReact} /> + TailwindCSS
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
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1"
              target="_blank"
              rel="license noopener noreferrer"
              className="hover:text-secondary inline-block"
            >
              CC BY-NC-SA 4.0
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
