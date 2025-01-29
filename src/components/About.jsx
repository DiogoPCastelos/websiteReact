import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TechStack from "./TechStack";
import {
  faComputer,
  faMicrophone,
  faSailboat,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const baseURL = import.meta.env.BASE_URL;

  return (
    <div
      className="relative w-full h-[100vh] flex bg-cover bg-center"
      style={{
        backgroundImage: `url('${baseURL}images/stars.jpg')`, // Updated path
      }}
    >
      {/* Left Side: Content */}
      <div className="flex-1 flex flex-col justify-center items-centerg-opacity-50 text-white text-center p-10">
        <h1 className="text-4xl font-bold">Diogo Piteira Castelos</h1>
        <p className="text-xl mt-4">Full-Stack Developer</p>
        <p className="text-xl">Mobile and Web Development</p>
        <div>
          <TechStack />
        </div>
      </div>

      {/* Right Side: Name and Occupation */}
      <div className="flex-1 flex flex-col justify-center p-10 text-white">
        <p className="text-lg">
          Hi, my name is <strong>Diogo Piteira Castelos</strong>, a 21-year-old
          Computer Engineering student from Évora, Portugal, currently pursuing
          my <FontAwesomeIcon icon={faComputer} color="grey" /> Engineering
          degree at the <strong>NOVA University of Lisbon</strong>. Alongside my
          studies, I work as a{" "}
          <strong>Full-Stack Mobile and Web Software Developer</strong> at{" "}
          <strong>In-Nova</strong>.
        </p>
        <p className="text-lg mt-4">
          My passion lies in technology and software development, with a
          particular love for <strong>front-end development</strong>, where
          creativity meets functionality. Outside the tech world, I find
          inspiration in <FontAwesomeIcon icon={faSailboat} color="white" />{" "}
          <strong>sailing</strong>,{" "}
          <FontAwesomeIcon icon={faMicrophone} color="white" />{" "}
          <strong>debating</strong>, and constantly seeking new challenges that
          push me to grow both personally and professionally.
        </p>
        <p className="text-lg mt-4">
          Native in <strong>Portuguese</strong> and <strong>English</strong>{" "}
          fluent in <strong>Spanish</strong> and <strong>French</strong>.
        </p>
        <p className="text-lg mt-4">
          I’m actively looking for <strong>internships</strong> and{" "}
          <strong>job opportunities</strong> in software development, eager to
          contribute, learn, and innovate in dynamic and collaborative
          environments.
        </p>
      </div>
    </div>
  );
};

export default About;
