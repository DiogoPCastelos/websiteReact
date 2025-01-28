import { useState } from "react";

const projectsData = [
  {
    id: 1,
    name: "ATS-GoogleAPI Integration Handler",
    description:
      "A handler that reads values from a Google Sheet data pool and curls them to Greenhouse using both Greenhouse and Google APIs. If you want to see the code working in its full glory, make sure to check out GConnection and sign up for a spot on their incredible recruiting app!",
    link: "https://github.com/DiogoPCastelos/ATS-Integration-Google-Sheets-Handler",
    tech: ["js.svg", "google.png", "node.png", "git.png"],
    photo: "src/assets/images/gconnection.jpg",
  },
  {
    id: 2,
    name: "Discord Bot",
    description:
      "Discord Bot I made to help a livestream with prize giving. This way I ensured the streamer didn't know who won until it was time to reveal the winner. Making the reactions more organic! Also made it so that there was a permanent card with the name of the winner on the guild we were in. Making it like a reward in itself.",
    link: "https://github.com/DiogoPCastelos/awardsbot",
    tech: ["js.svg", "discord.png", "git.png"],
    photo: "src/assets/images/discordbg.jpg",
  },
  {
    id: 3,
    name: "Assembly examples",
    description:
      "Simple assembly examples in x86 made to help my classmates understand the basics of assembly. This project also helped me train my assembly skills.",
    link: "https://github.com/DiogoPCastelos/Assembly-Examples",
    tech: ["ass.png"],
    photo: "src/assets/images/cb.jpg",
  },
  {
    id: 4,
    name: "The website you're visiting now.",
    description:
      "Designed in Figma, brought to life using Vite, React, and Tailwind.",
    link: "",
    tech: [
      "react.svg",
      "js.svg",
      "tailwind.png",
      "html.webp",
      "css.png",
      "bash.png",
      "git.png",
      "node.png",
    ],
    photo: "src/assets/images/stars.jpg",
  },
];

const Projects = () => {
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
              backgroundImage: `url(${project.photo})`,
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
                      src={`/src/assets/images/${icon}`}
                      alt={icon}
                      className="h-[4vh] w-[4vh] object-contain"
                    />
                  ))}
                </div>
              </div>

              {/* Right Side: Arrow Indicator */}
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

            {/* Expandable Content */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                openProjects[project.id] ? "max-h-[500px] p-6" : "max-h-0 p-0"
              } overflow-hidden`}
            >
              <p className="text-white p-4">{project.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
