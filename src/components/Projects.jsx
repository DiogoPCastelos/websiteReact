import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { projectsData } from "../constants/constants.js";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const baseURL = import.meta.env.BASE_URL;
  const containerSize = { width: 300, height: 500 }; // 30vw x 60vh in pixels
  const imageSize = 80; // 8vh in pixels
  const minSpacing = 80; // Minimum spacing between images

  // Generate random positions for tech icons
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

        return { x, y, rotate: Math.random() * 90 - 45 }; // Random rotation (-45° to 45°)
      });

      return acc;
    }, {});
  };

  const techPositions = useMemo(generateTechPositions, []); // Memoize positions

  return (
    <div className="flex flex-col items-center w-full h-fit justify-center space-y-12">
      {projectsData.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full max-w-4xl p-10 glass-card flex flex-row items-center gap-10"
        >
          {/* Description Section */}
          <div className="flex-1 max-w-prose">
            <h2
              onClick={() => window.open(project.link)}
              className="text-3xl cursor-pointer font-semibold tracking-tight text-white title-hover"
            >
              {project.name}
            </h2>
            <p className="mt-4 text-gray-300 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Icons */}
          <div className="relative w-1/3 h-[30vh] flex justify-center items-center">
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
