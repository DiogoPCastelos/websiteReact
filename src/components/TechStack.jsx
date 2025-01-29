import { useState, useEffect } from "react";
import emailjs from "emailjs-com";

const TechStack = () => {
  const baseURL = import.meta.env.BASE_URL; // Dynamically resolve the base URL

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <img
        src={`${baseURL}src/assets/images/react.svg`}
        alt="react"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/vite.svg`}
        alt="vite"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/tailwind.png`}
        alt="tailwind"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/py.webp`}
        alt="python"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/c.png`}
        alt="c"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/post.png`}
        alt="postgressql"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/node.png`}
        alt="nodejs"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/npm.png`}
        alt="npm"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/git.png`}
        alt="git"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/figma.png`}
        alt="figma"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/js.svg`}
        alt="js"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/java.png`}
        alt="java"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/html.webp`}
        alt="html"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/css.png`}
        alt="css"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/docker.png`}
        alt="docker"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/spring.png`}
        alt="springboot"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/mongo.webp`}
        alt="mongodb"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/google.png`}
        alt="googleapis"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/discord.png`}
        alt="discord"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/bash.png`}
        alt="bash"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/ass.png`}
        alt="assembly"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/kotlin.png`}
        alt="kotlin"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/jira.svg`}
        alt="jira"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/linux.png`}
        alt="linux"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/lua.png`}
        alt="lua"
        className="size-[6vh] object-contain"
      />
      <img
        src={`${baseURL}src/assets/images/django.svg`}
        alt="django"
        className="size-[6vh] object-contain"
      />
    </div>
  );
};

export default TechStack;
