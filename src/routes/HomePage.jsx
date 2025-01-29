import { useState, useRef } from "react";
import { About, Projects, Contact } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function HomePage() {
  const [about, setAbout] = useState(true);
  const [rotateAva, setRotateAva] = useState(false);

  // References to Projects and Contact sections
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Handlers to toggle visibility
  const aboutHandler = () => setAbout(!about);
  const projectsHandler = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const contactHandler = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const rotateAvaHandler = () => setRotateAva(!rotateAva);

  return (
    <div className="relative bg-background min-h-screen text-textPrimary flex flex-col">
      {/* Topbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-[12vh] px-6">
        <button
          onClick={() => {
            aboutHandler();
            rotateAvaHandler();
          }}
          className={`hover:font-semibold transition-transform duration-300 ${
            about
              ? "text-secondary font-semibold"
              : "text-textPrimary hover:text-secondary"
          }`}
        >
          <img
            src="/src/assets/images/ava.jpeg"
            alt="Logo"
            className={`h-[8vh] rounded-full transform-gpu transition-transform duration-300 ${
              rotateAva ? "rotate-360" : ""
            }`}
          />
        </button>

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
            href="/src/CV - Diogo Piteira Castelos.pdf"
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
        <div
          className={`transition-all duration-700 ease-in-out ${
            about
              ? "opacity-100 max-h-[100vh]"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <About />
        </div>

        {/* Other Sections */}
        <div className="flex flex-col space-y-6 p-6 items-center max-w-screen mx-auto">
          {/* Projects Section */}
          <div
            ref={projectsRef}
            className={`${about ? "" : "pt-[12vh]"} w-screen`}
          >
            <Projects />
          </div>
          {/* Contact Section */}
          <div
            ref={contactRef}
            className={`transition-all max-w-screen-lg duration-700 opacity-100 max-h-[100vh] py-4 ${
              about ? "" : "pt-[12vh]"
            } `}
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
