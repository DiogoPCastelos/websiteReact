import { About, Projects, Contact } from "../components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function HomePage() {
  const [about, setAbout] = useState(true);
  const [projects, setProjects] = useState(true);
  const [contact, setContact] = useState(true);
  const [rotateAva, setRotateAva] = useState(false); // State to handle avatar rotation

  const aboutHandler = () => setAbout(!about);
  const projectsHandler = () => setProjects(!projects);
  const contactHandler = () => setContact(!contact);

  const rotateAvaHandler = () => setRotateAva(!rotateAva); // Toggle avatar rotation

  return (
    <div className="relative bg-background min-h-screen text-textPrimary flex flex-col">
      {/* Topbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-[12vh] px-6">
        <button
          onClick={() => {
            aboutHandler();
            rotateAvaHandler(); // Rotate avatar on click
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
            onClick={contactHandler}
            className={`hover:font-semibold transition-transform duration-300 ${
              contact
                ? "text-secondary font-semibold"
                : "text-textPrimary hover:text-secondary"
            }`}
          >
            Contact
          </button>
          <button
            onClick={projectsHandler}
            className={`hover:font-semibold transition-transform duration-300 ${
              projects
                ? "text-secondary font-semibold"
                : "text-textPrimary hover:text-secondary"
            }`}
          >
            Projects
          </button>
          <a
            href="src/assets/CV - Diogo Piteira Castelos.pdf"
            download
            className="hover:font-semibold hover:text-secondary transition-transform duration-300"
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
        <div className="flex flex-col space-y-6 p-6 max-w-screen-lg mx-auto">
          {/* Contact Section */}
          <div
            className={`transition-all duration-700 ${
              contact
                ? "opacity-100 max-h-[100vh] py-4"
                : "opacity-0 max-h-0 overflow-hidden"
            } ${about ? "" : "pt-[12vh]"} `}
          >
            <Contact />
          </div>

          {/* Projects Section */}
          <div
            className={`transition-all duration-700 ${
              projects
                ? "opacity-100 max-h-[100vh] py-4"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}
          >
            <Projects />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background text-center py-4">
        <div className="flex justify-center space-x-6 mb-2">
          <FontAwesomeIcon
            size="3x"
            icon={faLinkedin}
            onClick={() =>
              window.open("https://www.linkedin.com/in/diogopcastelos/")
            }
            className="cursor-pointer hover:text-secondary"
          />
          <FontAwesomeIcon
            size="3x"
            icon={faGithub}
            onClick={() => window.open("https://github.com/DiogoPCastelos/")}
            className="cursor-pointer hover:text-secondary"
          />
          <FontAwesomeIcon
            size="3x"
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
      </footer>
    </div>
  );
}

export default HomePage;
