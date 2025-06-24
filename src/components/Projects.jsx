import { projectsData } from "../constants/constants.js";
import { useMemo, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const Projects = () => {
  const baseURL = import.meta.env.BASE_URL;
  const imageSize = 80;
  const minSpacing = 80;

  // Generate random tech positions based on container size
  const generateTechPositions = (containerSize) => {
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

  return (
    <div className="flex flex-col items-center bg-transparent w-full h-fit justify-center space-y-12">
      {projectsData.map((project) => {
        const cardRef = useRef(null);
        const isInView = useInView(cardRef, {
          triggerOnce: true,
          threshold: 0.3,
        });
        const [containerSize, setContainerSize] = useState({
          width: 0,
          height: 0,
        });

        useEffect(() => {
          if (cardRef.current) {
            const timeout = setTimeout(() => {
              setContainerSize({
                width: cardRef.current.getBoundingClientRect().width - 40,
                height: cardRef.current.getBoundingClientRect().height - 40,
              });
            }, 300); // 200ms delay before setting dimensions

            return () => clearTimeout(timeout); // Cleanup timeout on unmount
          }
        }, []);

        const techPositions = useMemo(
          () => generateTechPositions(containerSize),
          [containerSize]
        );

        return (
          <motion.div
            ref={cardRef}
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full max-w-4xl p-10 z-[30] glass-card flex flex-col md:flex-row items-center gap-10 relative"
          >
            {/* Description Section */}
            <div className="relative z-[10] flex-1 max-w-fit">
              <h2
                onClick={() => window.open(project.link)}
                className="text-3xl cursor-pointer z-[30] font-semibold tracking-tight text-white title-hover w-fit relative"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {project.name}
              </h2>
              <p
                className="mt-4 text-gray-300 w-full z-[30] leading-relaxed text-lg font-inter relative"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {project.description}
              </p>

              {/* Tech Stack (Only Appears When Each Card is in View) */}
              <motion.div
                className="absolute inset-0 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }} // Individual Card Logic
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {techPositions[project.id]?.map(({ x, y, rotate }, index) => (
                  <motion.img
                    key={index}
                    initial={{ opacity: 0, scale: 0.85, x, y, rotate }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      scale: isInView ? 1 : 0,
                      x,
                      y,
                      rotate,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.3 }}
                    src={`${baseURL}images/${project.tech[index]}`}
                    alt={project.tech[index].split(".")[0]}
                    className="absolute blur-[2px] brightness-60 w-[5vh] h-[5vh] object-contain"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Projects;
