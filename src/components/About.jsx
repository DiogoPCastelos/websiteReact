import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faSailboat } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div
      className="relative w-full h-[100vh] flex bg-cover bg-center"
      style={{
        backgroundImage: "url('src/assets/images/stars.jpg')",
      }}
    >
      {/* Left Side: Content */}
      <div className="flex-1 flex flex-col justify-center items-centerg-opacity-50 text-white text-center p-10">
        <h1 className="text-4xl font-bold">Diogo Piteira Castelos</h1>
        <p className="text-xl mt-4">Full-Stack Developer</p>
        <p className="text-xl">Mobile and Web Development</p>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          <img
            src="src/assets/images/ass.png"
            alt="assembly"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/bash.png"
            alt="bash"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/css.png"
            alt="css"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/discord.png"
            alt="discord"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/django.svg"
            alt="django"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/docker.png"
            alt="docker"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/figma.png"
            alt="figma"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/git.png"
            alt="git"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/google.png"
            alt="googleapis"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/html.webp"
            alt="html"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/java.png"
            alt="java"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/jira.svg"
            alt="jira"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/js.svg"
            alt="js"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/kotlin.png"
            alt="kotlin"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/linux.png"
            alt="linux"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/lua.png"
            alt="lua"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/mongo.webp"
            alt="mongdb"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/node.png"
            alt="nodejs"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/post.png"
            alt="postgressql"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/py.webp"
            alt="python"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/spring.png"
            alt="springboot"
            className="size-[6vh] object-contain"
          />
          <img
            src="src/assets/images/tailwind.png"
            alt="tailwind"
            className="size-[6vh] object-contain"
          />
        </div>
      </div>

      {/* Right Side: Name and Occupation */}

      <div className="flex-1 flex flex-col justify-center p-10 text-white">
        <p className="text-lg">
          Hi, my name is <strong>Diogo Piteira Castelos</strong>, a 21-year-old
          Computer Engineering student from Évora, Portugal, currently pursuing
          my <FontAwesomeIcon icon={faComputer} color="purple" /> Engineering
          degree at the <strong>NOVA University of Lisbon</strong>. Alongside my
          studies, I work as a{" "}
          <strong>Full-Stack Mobile and Web Software Developer</strong> at{" "}
          <strong>
            Associação In-Nova - Consultoria Júnior da Nova School of Science
            and Technology
          </strong>
          .
        </p>
        <p className="text-lg mt-4">
          My passion lies in technology and software development, with a
          particular love for <strong>front-end development</strong>, where
          creativity meets functionality. Outside the tech world, I find
          inspiration in <FontAwesomeIcon icon={faSailboat} color="purple" />{" "}
          <strong>sailing</strong>, <strong>debating</strong>, and constantly
          seeking new challenges that push me to grow both personally and
          professionally.
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
