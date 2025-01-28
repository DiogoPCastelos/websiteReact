import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAbout = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col text-textPrimary bg-gray-100 rounded-3xl shadow-md overflow-hidden">
      {/* Always visible and clickable title */}
      <div
        onClick={toggleAbout}
        className="cursor-pointer bg-gray-200 p-4 rounded-t-3xl flex justify-between items-center hover:bg-gray-300 transition"
      >
        <h2 className="text-2xl font-bold">About Me</h2>
        <span
          className={`text-lg transition-transform ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </div>

      {/* Collapsible content */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[100vh] p-6" : "max-h-0 p-0"
        } overflow-hidden`}
      >
        <p className="text-lg">
          Hi, my name is <strong>Diogo Piteira Castelos</strong>, a 21-year-old
          Computer Engineering student from Évora, Portugal, currently pursuing
          my <FontAwesomeIcon icon={faComputer} /> Engineering degree at the{" "}
          <strong>NOVA University of Lisbon</strong>. Alongside my studies, I
          work as a{" "}
          <strong>Full-Stack Mobile and Web Software Developer</strong> at{" "}
          <strong>
            Associação In-Nova - Consultoria Júnior da Nova School of Science
            and Technology
          </strong>
          .
        </p>
        <p className="text-lg">
          My passion lies in technology and software development, with a
          particular love for <strong>front-end development</strong>, where
          creativity meets functionality. Outside the tech world, I find
          inspiration in <strong>sailing</strong>, <strong>debating</strong>,
          and constantly seeking new challenges that push me to grow both
          personally and professionally.
        </p>
        <p className="text-lg">
          I’m actively looking for <strong>internships</strong> and{" "}
          <strong>job opportunities</strong> in software development, eager to
          contribute, learn, and innovate in dynamic and collaborative
          environments. Oh, and if you’ve noticed the spinning logo, that’s just
          my playful touch—I believe every great detail has the power to
          delight.
        </p>
      </div>
    </div>
  );
};

export default About;
