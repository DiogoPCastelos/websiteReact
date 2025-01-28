import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleProjects = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col text-textPrimary bg-gray-100 rounded-3xl shadow-md overflow-hidden">
      {/* Always visible and clickable title */}
      <div
        onClick={toggleProjects}
        className="cursor-pointer bg-gray-200 p-4 rounded-t-3xl flex justify-between items-center hover:bg-gray-300 transition group"
      >
        <h2 className="text-2xl font-bold">Projects Me</h2>
        <span
          className={`text-lg transition-transform ${
            isExpanded
              ? "rotate-180 group-hover:text-red-400"
              : "rotate-0 group-hover:text-green-400"
          }`}
        >
          ▼
        </span>
      </div>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[100vh] p-6" : "max-h-0 p-0"
        } overflow-hidden`}
      >
        <div>Projects yadda</div>
      </div>
    </div>
  );
};

export default Projects;
