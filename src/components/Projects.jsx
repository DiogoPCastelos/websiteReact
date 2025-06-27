import { projectsData } from "../constants/constants.js";
import { useMemo, useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const Projects = () => {
  const baseURL = import.meta.env.BASE_URL;
  const imageSize = 80;
  const minSpacing = 80;

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
    <div className="flex flex-col items-center w-full h-fit justify-center space-y-12">
      {projectsData.map((project) => {
        const cardRef = useRef(null);
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
        const [isHovered, setIsHovered] = useState(false);
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
              const rect = cardRef.current.getBoundingClientRect();
              setContainerSize({
                width: rect.width - 40,
                height: rect.height - 40,
              });
            }, 300);
            return () => clearTimeout(timeout);
          }
        }, []);

        const handleMouseMove = (e) => {
          if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            setMousePosition({ x, y });
          }
        };

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
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePosition({ x: 0, y: 0 });
            }}
            onClick={() => window.open(project.link)}
            className="relative w-full max-w-4xl p-10 flex flex-col md:flex-row items-center gap-10 overflow-hidden cursor-pointer group bg-white/5 rounded-[24px] border border-white/10"
            style={{
              boxShadow: `
                0 0 0 1px rgba(255, 255, 255, 0.04),
                0 8px 32px rgba(0, 0, 0, 0.25),
                inset 0 1px 1px rgba(255, 255, 255, 0.08)
              `,
              transform: "perspective(1000px)",
              transition: "all 0.3s ease",
            }}
          >
            {/* Inner distortion */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${
                  (mousePosition.x + 1) * 50
                }% ${
                  (mousePosition.y + 1) * 50
                }%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, transparent 80%)`,
                mixBlendMode: "screen",
                filter: "blur(30px)",
                opacity: 0.3,
                transform: `translate(${mousePosition.x * 10}px, ${
                  mousePosition.y * 10
                }px)`,
                transition: "all 0.3s ease",
              }}
            />

            {/* Edge glow */}
            <div
              className="absolute inset-0 z-0 pointer-events-none rounded-[24px]"
              style={{
                background: `linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.02), rgba(255,255,255,0.08))`,
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Tech Icons */}
            <motion.div
              className="absolute z-0 inset-0 flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
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

            {/* Text Content */}
            <div className="relative z-10 flex-1 max-w-fit">
              <motion.h2
                className="text-3xl font-semibold tracking-tight text-white w-fit relative group-hover:text-purple-200 transition-colors duration-300"
                style={{ fontFamily: "Poppins, sans-serif" }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {project.name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h2>

              <motion.p
                className="mt-4 text-gray-300 leading-relaxed text-lg group-hover:text-gray-200 transition-colors duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {project.description}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Projects;
