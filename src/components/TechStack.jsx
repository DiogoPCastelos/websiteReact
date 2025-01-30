import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TechStack = () => {
  const baseURL = import.meta.env.BASE_URL; // Dynamically resolve base path
  const [isTouch, setIsTouch] = useState(false);

  // Detect if the device is touch-enabled
  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Common animation config
  const animationProps = {
    animate: { rotate: 360 },
    transition: { stiffness: 50, damping: 5, type: "spring" },
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[
        { src: "react.svg", alt: "react" },
        { src: "vite.svg", alt: "vite" },
        { src: "tailwind.png", alt: "tailwind" },
        { src: "py.webp", alt: "python" },
        { src: "c.png", alt: "c" },
        { src: "post.png", alt: "postgresql" },
        { src: "node.png", alt: "nodejs" },
        { src: "npm.png", alt: "npm" },
        { src: "git.png", alt: "git" },
        { src: "figma.png", alt: "figma" },
        { src: "js.svg", alt: "js" },
        { src: "java.png", alt: "java" },
        { src: "html.webp", alt: "html" },
        { src: "css.png", alt: "css" },
        { src: "docker.png", alt: "docker" },
        { src: "spring.png", alt: "springboot" },
        { src: "mongo.webp", alt: "mongodb" },
        { src: "google.png", alt: "googleapis" },
        { src: "discord.png", alt: "discord" },
        { src: "bash.png", alt: "bash" },
        { src: "ass.png", alt: "assembly" },
        { src: "kotlin.png", alt: "kotlin" },
        { src: "jira.svg", alt: "jira" },
        { src: "linux.png", alt: "linux" },
        { src: "lua.png", alt: "lua" },
        { src: "django.svg", alt: "django" },
      ].map(({ src, alt }, index) => (
        <motion.img
          key={index}
          {...(isTouch
            ? {
                onTouchStart: (e) =>
                  e.currentTarget.classList.add("rotate-360"),
              }
            : { whileHover: { rotate: 360 } })}
          transition={{ stiffness: 50, damping: 5, type: "spring" }}
          src={`${baseURL}images/${src}`}
          alt={alt}
          className="size-[6vh] object-contain"
        />
      ))}
    </div>
  );
};

export default TechStack;
