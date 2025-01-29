import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { projectsData } from "../constants/constants.js";
import { motion } from "motion/react";
const Projects = () => {
  const baseURL = import.meta.env.BASE_URL;
  // Store already-used positions to avoid overlap
  const usedPositions = new Set();

  // Generate a unique random position ensuring no overlap
  const getUniquePosition = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 400 - 200); // X offset (-200px to 200px)
      y = Math.floor(Math.random() * 400 - 200); // Y offset (-200px to 200px)
    } while (usedPositions.has(`${x},${y}`)); // Avoid repeated positions

    usedPositions.add(`${x},${y}`);
    return { x, y };
  };

  return (
    <div className="flex flex-col items-center w-full h-fit justify-center">
      {projectsData.map((project) => (
        <div
          key={project.id}
          className="flex flex-col w-full h-fit space-y-8 px-2 py-8 bg-gray-500 border-2 border-amber-950"
        >
          {/* Project Name */}
          <div className="w-full pl-[8vh] pt-[2vh] font-mono">
            {project.name}
          </div>

          {/* Project Content */}
          <div className="flex flex-wrap w-full h-fit items-start justify-between">
            {/* Description (Takes More Space) */}
            <div className="flex-[2_1_0%] min-w-[50%]">
              {project.description}
            </div>
            <div className="relative w-full h-[60vh] flex justify-center items-center">
              {project.tech.map((techItem, index) => {
                const { x, y } = getUniquePosition(); // Ensure non-overlapping placement
                const randomRotation = Math.random() * 90 - 45; // Rotation (-45° to 45°)

                return (
                  <motion.div
                    key={index}
                    initial={{
                      x,
                      y,
                      rotate: randomRotation,
                      opacity: 0,
                    }}
                    animate={{
                      x,
                      y,
                      rotate: randomRotation,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                    className="absolute"
                  >
                    <img
                      src={`${baseURL}images/${techItem}`}
                      alt={techItem.split(".")[0]}
                      className="w-[10vh] h-[10vh] object-contain"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
