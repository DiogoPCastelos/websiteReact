import { motion } from "framer-motion";

const TechStack = () => {
  const baseURL = import.meta.env.BASE_URL; // Dynamically resolve base path

  // Spring transition config
  const springConfig = {
    type: "spring",
    stiffness: 50,
    damping: 5,
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {[
        { src: "react.webp", alt: "react", link: "https://react.dev/" },
        { src: "vite.webp", alt: "vite", link: "https://vitejs.dev/" },
        {
          src: "tailwind.webp",
          alt: "tailwind",
          link: "https://tailwindcss.com/",
        },
        { src: "py.webp", alt: "python", link: "https://www.python.org/" },
        { src: "c.webp", alt: "c", link: "https://www.c-language.org" },
        {
          src: "post.webp",
          alt: "postsql",
          link: "https://www.postgresql.org/",
        },
        {
          src: "firebase.webp",
          alt: "firebase",
          link: "https://firebase.google.com/",
        },
        { src: "node.webp", alt: "nodejs", link: "https://nodejs.org/en" },
        { src: "npm.webp", alt: "npm", link: "http://npmjs.com" },
        { src: "git.webp", alt: "git", link: "https://git-scm.com" },
        { src: "figma.webp", alt: "figma", link: "http://figma.com" },
        {
          src: "js.webp",
          alt: "js",
          link: "https://ecma-international.org/publications-and-standards/standards/ecma-262/",
        },
        { src: "java.webp", alt: "java", link: "https://www.java.com/en/" },
        { src: "html.webp", alt: "html", link: "https://html.spec.whatwg.org" },
        { src: "css.webp", alt: "css", link: "https://www.w3.org/TR/css/#css" },
        { src: "docker.webp", alt: "docker", link: "https://docker.com" },
        {
          src: "spring.webp",
          alt: "springboot",
          link: "https://spring.io/projects/spring-boot",
        },
        { src: "mongo.webp", alt: "mongodb", link: "https://www.mongodb.com" },
        {
          src: "google.webp",
          alt: "api",
          link: "http://console.cloud.google.com",
        },
        { src: "discord.webp", alt: "discord", link: "http://discord.com" },
        {
          src: "bash.webp",
          alt: "bash",
          link: "https://www.gnu.org/software/bash/",
        },
        {
          src: "asm.webp",
          alt: "assembly",
          link: "https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html",
        },
        { src: "kotlin.webp", alt: "kotlin", link: "https://kotlinlang.org" },
        {
          src: "jira.webp",
          alt: "jira",
          link: "https://www.atlassian.com/software/jira",
        },
        { src: "linux.webp", alt: "linux", link: "https://www.linux.org" },
        { src: "lua.webp", alt: "lua", link: "https://www.lua.org" },
        {
          src: "django.webp",
          alt: "django",
          link: "https://www.djangoproject.com",
        },
      ].map(({ src, alt, link }, index) => (
        <motion.img
          key={index}
          whileHover={{ rotate: 360 }} // Rotate once on hover
          transition={springConfig} // Smooth spring animation
          onClick={() => window.open(link, "_blank")} // Increment rotation on touch
          src={`${baseURL}images/${src}`}
          alt={alt}
          className="size-[6vh] object-contain cursor-pointer"
        />
      ))}
    </div>
  );
};

export default TechStack;
