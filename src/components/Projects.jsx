import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { projectsData } from "../constants/constants.js";
import { useMemo } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const baseURL = import.meta.env.BASE_URL;
  const containerSize = {
    width: window.outerWidth > 800 ? 300 : 300,
    height: window.outerWidth > 800 ? 500 : 500,
  };
  const imageSize = 80;
  const minSpacing = 80;

  const generateTechPositions = () => {
    return projectsData.reduce((acc, project) => {
      const usedPositions = [];
      acc[project.id] = project.tech.map(() => {
        let x,
          y,
          isValid,
          attempts = 0;
        do {
          x =
            Math.random() * (containerSize.width - imageSize) -
            containerSize.width / 2;
          y =
            Math.random() * (containerSize.height - imageSize) -
            containerSize.height / 2;
          isValid = usedPositions.every(
            (pos) => Math.hypot(pos.x - x, pos.y - y) > minSpacing
          );
          attempts++;
        } while (!isValid && attempts < 50);
        usedPositions.push({ x, y });
        return { x, y, rotate: Math.random() * 90 - 45 };
      });
      return acc;
    }, {});
  };

  const techPositions = useMemo(generateTechPositions, []);

  return (
    <div className="flex flex-col items-center bg-transparent w-full h-fit justify-center space-y-12">
      {projectsData.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-4xl p-10 glass-card flex flex-col md:flex-row items-center gap-10 relative"
        >
          {/* Description Section (Takes Full Width on Mobile) */}
          <div className="relative flex-1 max-w-prose z-10">
            <h2
              onClick={() => window.open(project.link)}
              className="text-3xl cursor-pointer font-semibold tracking-tight text-white title-hover relative"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {project.name}
            </h2>
            <p
              className="mt-4 text-gray-300 z-[30] leading-relaxed text-lg font-inter relative"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {project.description}
            </p>

            {/* Tech Stack Icons Overlapping the Description on Mobile */}
            <div className="absolute inset-0 flex md:hidden justify-center items-center">
              {techPositions[project.id]?.map(({ x, y, rotate }, index) => (
                <motion.img
                  key={index}
                  initial={{ opacity: 0, scale: 0.85, x, y, rotate }}
                  animate={{ opacity: 0.6, scale: 1, x, y, rotate }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.1, rotate: rotate + 5 }}
                  src={`${baseURL}images/${project.tech[index]}`}
                  alt={project.tech[index].split(".")[0]}
                  className="absolute w-[10vh] h-[10vh] object-contain transition-transform opacity-50 filter blur-xs z-[10]"
                />
              ))}
            </div>
          </div>

          {/* Tech Stack Icons (Separate on Desktop) */}
          <div className="relative w-full md:w-1/3 h-[30vh] flex md:justify-center md:items-center hidden md:flex">
            {techPositions[project.id]?.map(({ x, y, rotate }, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, scale: 0.85, x, y, rotate }}
                animate={{ opacity: 1, scale: 1, x, y, rotate }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{ scale: 1.1, rotate: rotate + 5 }}
                src={`${baseURL}images/${project.tech[index]}`}
                alt={project.tech[index].split(".")[0]}
                className="absolute w-[6vh] h-[6vh] object-contain transition-transform"
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Projects;
