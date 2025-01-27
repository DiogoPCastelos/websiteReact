import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-row h-[12vh] justify-between items-start bg-topbar text-textPrimary">
      <img
        src="/src/assets/images/ava.jpeg"
        alt="Logo"
        className="size-[12vh] p-2 rounded-[50%] ml-5 hover:rotate-360 transform-gpu transition-all duration-300"
        onClick={() => navigate("/")}
      />
      <div className="flex flex-row w-full h-full space-x-0 items-center justify-center">
        <button
          onClick={() => navigate("/about")}
          className="flex flex-col items-center justify-center h-full px-5 hover:text-secondary transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5"
        >
          About
        </button>
        <button
          onClick={() => navigate("/works")}
          className="flex flex-col items-center justify-center h-full px-5 hover:text-secondary transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5"
        >
          Works
        </button>
        <button
          onClick={() => navigate("/contact")}
          className="flex flex-col items-center justify-center h-full px-5 hover:text-secondary transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5"
        >
          Contact
        </button>
        <button
          onClick={() => navigate("/cv")}
          className="flex flex-col items-center justify-center h-full px-5 hover:text-secondary transition-scale duration-300 hover:scale-125 transform-gpu hover:-translate-y-2.5"
        >
          CV
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
