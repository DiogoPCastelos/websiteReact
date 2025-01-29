import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { projectsData } from "../constants/constants.js";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const baseURL = import.meta.env.BASE_URL;

  return (
    <div className="flex flex-col items-center w-full h-fit justify-center">
      {projectsData.map((project) => {
        const [positions, setPositions] = useState([]);

        useEffect(() => {
          const generateUniquePositions = () => {
            const usedPositions = [];
            const minSpacing = 12 * 10; // Ensuring at least 10vh spacing

            return project.tech.map(() => {
              let x, y, validPosition;
              do {
                x = Math.floor(Math.random() * 200 - 100); // Random X offset (-100px to 100px)
                y = Math.floor(Math.random() * 200 - 100); // Random Y offset (-100px to 100px)

                validPosition = usedPositions.every(
                  (pos) => Math.hypot(pos.x - x, pos.y - y) > minSpacing
                );
              } while (!validPosition);

              usedPositions.push({ x, y });
              return { x, y, rotate: Math.random() * 90 - 45 }; // Rotation (-45° to 45°)
            });
          };

          setPositions(generateUniquePositions());
        }, [project.tech]); // Runs once per project

        return (
          <div
            key={project.id}
            className="flex flex-row w-full h-fit space-y-8 px-2 py-8 bg-gray-500 border-2 border-amber-950"
          >
            {/* Left Side: Project Name & Description */}
            <div className="flex-[2_3] flex flex-col space-y-4 p-6">
              {/* Project Name */}
              <div className="w-full flex flex-row items-center gap-2 pt-[2vh] font-mono">
                <h2 className="text-2xl font-bold text-white">
                  {project.name}
                </h2>
                <FontAwesomeIcon
                  icon={faGlobe}
                  onClick={() => window.open(project.link)}
                  className="cursor-pointer hover:text-secondary transition-colors duration-200"
                />
              </div>

              {/* Description */}
              <p className="text-white">{project.description}</p>
            </div>

            {/* Right Side: Scattered Tech Stack Icons (1/3 of the width) */}
            <div className="relative flex-[1_3] h-[40vh] flex justify-center items-center">
              {positions.map(({ x, y, rotate }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, x, y, rotate }}
                  animate={{ opacity: 1, scale: 1, x, y, rotate }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute"
                >
                  <img
                    src={`${baseURL}images/${project.tech[index]}`}
                    alt={project.tech[index].split(".")[0]}
                    className="w-[10vh] h-[10vh] object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
