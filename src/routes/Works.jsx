import { About, Projects, Contact } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-regular-svg-icons";
import {
  faReact,
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Works() {
  const navigate = useNavigate();
  const [about, setAbout] = useState(true);
  const [projects, setProjects] = useState(true);
  const [contact, setContact] = useState(true); // Add contact state

  const aboutHandler = () => {
    setAbout(!about);
  };

  const projectsHandler = () => {
    setProjects(!projects);
  };

  const contactHandler = () => {
    setContact(!contact); // Toggle contact visibility
  };

  const closeHandler = () => {
    setAbout(false);
    setProjects(false);
    setContact(false); // Close all sections
  };

  return (
    <div className="bg-background w-screen h-screen text-textPrimary overflow-x-hidden">
      <nav className="flex flex-row h-[12vh] justify-between items-start bg-topbar text-textPrimary">
        <img
          src="/src/assets/images/ava.jpeg"
          alt="Logo"
          className="size-[12vh] p-2 rounded-[50%] ml-5 hover:rotate-360 transform-gpu transition-all duration-300"
          onClick={() => closeHandler()}
        />
        <div className="text-xl flex flex-row w-full h-full space-x-0 items-center justify-center text-textPrimary">
          <div className="w-fit flex flex-row h-full items-center justify-center">
            <button
              onClick={aboutHandler}
              className={`flex flex-col items-center justify-center h-full px-5 hover:font-semibold transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5 ${
                about
                  ? "text-secondary hover:text-red-500 font-semibold"
                  : "text-textPrimary hover:text-secondary "
              }`}
            >
              About
            </button>
            <button
              onClick={projectsHandler}
              className={`flex flex-col items-center justify-center h-full px-5 hover:font-semibold transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5 ${
                projects
                  ? "text-secondary hover:text-red-500 font-semibold"
                  : "text-textPrimary hover:text-secondary "
              }`}
            >
              Projects
            </button>
            <button
              onClick={contactHandler}
              className={`flex flex-col items-center justify-center h-full px-5 hover:font-semibold transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5 ${
                contact
                  ? "text-secondary hover:text-red-500 font-semibold"
                  : "text-textPrimary hover:text-secondary "
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => navigate("/cv")}
              className="flex flex-col items-center justify-center h-full px-5 hover:font-semibold hover:text-secondary transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5"
            >
              CV
            </button>
          </div>
        </div>
      </nav>
      <div className="flex flex-col space-y-6 border-y-6 border-x-8 px-2 py-6 border-background max-w-screen h-fit overflow-x-hidden">
        {/* Animated About Section */}
        <div
          className={`overflow-x-hidden transition-all duration-700 ease-in-out ${
            about
              ? "opacity-100 max-h-[100vh] py-4"
              : "opacity-0 max-h-0 py-0 overflow-hidden"
          }`}
        >
          <About />
        </div>

        {/* Animated Projects Section */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            projects
              ? "opacity-100 max-h-[100vh] py-4"
              : "opacity-0 max-h-0 py-0 overflow-hidden"
          }`}
        >
          <Projects />
        </div>

        {/* Animated Contact Section */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            contact
              ? "opacity-100 max-h-[100vh] py-4"
              : "opacity-0 max-h-0 py-0 overflow-x-hidden"
          }`}
        >
          <Contact />
        </div>

        {/* Other content will animate position to follow the About, Projects, and Contact sections */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            about || projects || contact ? "mt-4" : "mt-0"
          }`}
        >
          <div className="bg-background h-fit border-b-8 border-background p-4 rounded flex flex-row justify-evenly">
            <FontAwesomeIcon size="3x" icon={faLinkedin} />
            <FontAwesomeIcon size="3x" icon={faGithub} />
            <FontAwesomeIcon size="3x" icon={faInstagram} />
          </div>
          <div className="bg-gray-300 h-fit rounded">
            Made with Vite <FontAwesomeIcon icon={faReact} /> + TailwindCSS
          </div>
        </div>
      </div>
    </div>
  );
}

export default Works;
