import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TechStack = () => {
  const baseURL = import.meta.env.BASE_URL; // Dynamically resolve base path
  const [isTouch, setIsTouch] = useState(false);
  const [rotations, setRotations] = useState({}); // Store rotation state per image

  // Detect if the device is touch-enabled
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Spring transition config
  const springConfig = {
    type: "spring",
    stiffness: 50,
    damping: 5,
  };

  // Handle touch rotation (increments rotation by +360°)
  const handleTouchRotate = (index) => {
    setRotations((prev) => ({
      ...prev,
      [index]: (prev[index] || 0) + 360, // Increase rotation by +360°
    }));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[
        { src: "react.webp", alt: "react" },
        { src: "vite.webp", alt: "vite" },
        { src: "tailwind.webp", alt: "tailwind" },
        { src: "py.webp", alt: "python" },
        { src: "c.webp", alt: "c" },
        { src: "post.webp", alt: "postsql" },
        { src: "node.webp", alt: "nodejs" },
        { src: "npm.webp", alt: "npm" },
        { src: "git.webp", alt: "git" },
        { src: "figma.webp", alt: "figma" },
        { src: "js.webp", alt: "js" },
        { src: "java.webp", alt: "java" },
        { src: "html.webp", alt: "html" },
        { src: "css.webp", alt: "css" },
        { src: "docker.webp", alt: "docker" },
        { src: "spring.webp", alt: "springboot" },
        { src: "mongo.webp", alt: "mongodb" },
        { src: "google.webp", alt: "api" },
        { src: "discord.webp", alt: "discord" },
        { src: "bash.webp", alt: "bash" },
        { src: "asm.webp", alt: "assembly" },
        { src: "kotlin.webp", alt: "kotlin" },
        { src: "jira.webp", alt: "jira" },
        { src: "linux.webp", alt: "linux" },
        { src: "lua.webp", alt: "lua" },
        { src: "django.webp", alt: "django" },
      ].map(({ src, alt }, index) => (
        <motion.img
          key={index}
          whileHover={!isTouch ? { rotate: 360 } : {}} // Rotate once on hover
          animate={{ rotate: rotations[index] || 0 }} // Apply cumulative rotation
          transition={springConfig} // Smooth spring animation
          onClick={() => isTouch && handleTouchRotate(index)} // Increment rotation on touch
          src={`${baseURL}images/${src}`}
          alt={alt}
          className="size-[6vh] object-contain cursor-pointer"
        />
      ))}
    </div>
  );
};

export default TechStack;
