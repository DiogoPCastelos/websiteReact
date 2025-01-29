import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const projectsData = [
  {
    id: 1,
    name: "ATS-GoogleAPI Integration Handler",
    description:
      "Working with Application Tracking Systems (ATS) and the Google API presented an interesting challenge in automating and optimizing application processing workflows. As part of my work with GConnection, I built a handler that retrieves applications from an ATS API, sends them to Greenhouse, and logs the match results into a Google Sheet using the Google Sheets API. The goal was to create a seamless integration that would reduce manual effort while ensuring data accuracy. Developing this handler required extensive API research to understand how different ATS platforms structure their data and handle authentication. I spent a lot of time reading API documentation, testing endpoints, and troubleshooting data inconsistencies. In cases where documentation was unclear or incomplete, I took a more direct approach—contacting the companies responsible for ATS integrations to clarify requirements and ensure my implementation followed best practices. One of the key challenges was handling data mapping and validation between multiple systems. Each ATS had its own format for storing candidate information, and Greenhouse required a standardized input. To solve this, I built a flexible data transformation layer that could clean, restructure, and validate incoming data before sending it forward. The Google Sheets API was particularly useful for automating real-time logging and tracking of application matches, allowing recruiters to access up-to-date insights effortlessly. The final integration significantly improved efficiency, reduced manual errors, and streamlined the hiring process.",
    link: "https://github.com/DiogoPCastelos/ATS-Integration-Google-Sheets-Handler",
    tech: ["js.svg", "google.png", "node.png", "git.png", "npm.png"],
    photo: "images/gconnection.jpg",
  },
  {
    id: 2,
    name: "Discord Bot",
    description:
      "For a couple of years, I developed Discord bots using the Discord API, JavaScript, and Git, which presented both exciting opportunities and challenging roadblocks. One of the biggest challenges was understanding the intricacies of event-driven programming in Discord.js—handling commands, message events, and bot interactions efficiently without causing unnecessary API calls or rate limits. Early on, I struggled with properly structuring the bot’s code to ensure scalability and maintainability.\nTo overcome these challenges, I relied heavily on API documentation research, constantly referring back to Discord’s official docs to ensure I was implementing best practices. I also turned to Stack Overflow, where countless developers had encountered similar issues, allowing me to learn from their solutions and apply them to my projects. YouTube tutorials were another invaluable resource, helping me grasp asynchronous programming, working with WebSockets, and optimizing command handling.\nBeyond the technical side, debugging was another major challenge. Sometimes, an update to the Discord API would break previously working features, requiring quick adaptations and troubleshooting. Git became an essential tool in my workflow, allowing me to track changes, experiment with new features, and revert to previous versions when needed. Through trial and error, persistence, and research, I became more proficient in API integration, asynchronous programming, and bot automation, ultimately allowing me to create more efficient, scalable, and feature-rich Discord bots.",
    link: "https://github.com/DiogoPCastelos/awardsbot",
    tech: ["js.svg", "discord.png", "git.png", "npm.png", "mongo.webp"],
    photo: "images/discordbg.jpg",
  },
  {
    id: 3,
    name: "Assembly examples",
    description:
      "When I first encountered Assembly in university, I saw it as just another subject to get through. However, as I delved deeper into the intricacies of low-level programming, I found myself fascinated by how it gave me direct control over hardware operations. Unlike high-level languages, Assembly required me to think in terms of registers, memory addresses, and CPU instructions, which fundamentally changed the way I understood how computers work. What started as an academic requirement quickly turned into a passion. I began experimenting beyond the given coursework, writing my own optimized routines, analyzing disassembled code, and challenging myself to solve problems with as few instructions as possible. The more I explored, the more I realized how powerful and elegant Assembly could be. As my understanding grew, I started helping my classmates, breaking down complex concepts like stack operations, memory management, and instruction sets into digestible explanations. Teaching others reinforced my own knowledge and gave me an even deeper appreciation for the language. While Assembly may seem daunting at first, I found that with patience and the right approach, it could be an incredibly rewarding and insightful language to master.",
    link: "https://github.com/DiogoPCastelos/Assembly-Examples",
    tech: ["ass.png"],
    photo: "images/cb.jpg",
  },
  {
    id: 4,
    name: "The website you're visiting now.",
    description:
      "Designed in Figma, brought to life using Vite, React, and Tailwind. Timestamp 24h from 1st functionality and most of the website was already done as I challenged myself to make a website in 24h.",
    link: "https://github.com/DiogoPCastelos/websiteReact",
    tech: [
      "react.svg",
      "js.svg",
      "tailwind.png",
      "html.webp",
      "css.png",
      "bash.png",
      "git.png",
      "node.png",
      "npm.png",
    ],
    photo: "images/bgweb.jpg",
  },
];

const Projects = () => {
  const baseURL = import.meta.env.BASE_URL;

  const [openProjects, setOpenProjects] = useState({});

  const toggleProject = (id) => {
    setOpenProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      {projectsData.map((project) => (
        <div
          key={project.id}
          className="relative w-full border border-gray-400 overflow-hidden"
        >
          {/* Blurred Background Fix */}
          <div
            className="absolute inset-0 bg-cover bg-center before:absolute before:inset-0 before:bg-cover before:bg-center before:backdrop-blur-lg before:content-['']"
            style={{
              backgroundImage: `url(${baseURL}${project.photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Content */}
          <div className="relative group z-10 p-4">
            {/* Project Title & Tech Stack Icons */}
            <div
              className="flex justify-between items-center cursor-pointer w-full p-4"
              onClick={() => toggleProject(project.id)}
            >
              {/* Left Side: Project Name */}
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-white">{project.name}</h2>
                {/* Tech Stack Icons (6vh to the right of name) */}
                <div className="flex space-x-2 ml-[2vh]">
                  {project.tech.map((icon, index) => (
                    <img
                      key={index}
                      src={`${baseURL}images/${icon}`}
                      alt={icon}
                      className="h-[4vh] w-[4vh] object-contain"
                    />
                  ))}
                </div>
              </div>

              {/* Right Side: Arrow Indicator */}
              <div className="flex flex-row items-center space-x-2">
                <FontAwesomeIcon
                  icon={faGlobe}
                  onClick={() => window.open(project.link)}
                  className="z-50 h-[4vh] w-[4vh] text-white cursor-pointer"
                />
                <span
                  className={`text-lg transition-transform duration-300 ${
                    openProjects[project.id]
                      ? "rotate-180 group-hover:text-red-400"
                      : "rotate-0 group-hover:text-green-400"
                  }`}
                >
                  ▼
                </span>
              </div>
            </div>

            {/* Expandable Content */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                openProjects[project.id] ? "max-h-[500px] p-6" : "max-h-0 p-0"
              } overflow-hidden`}
            >
              <p className="text-secondary p-4">{project.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
