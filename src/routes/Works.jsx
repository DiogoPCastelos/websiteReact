import React from "react";
import { TopBar } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer } from "@fortawesome/free-solid-svg-icons";

function Works() {
  return (
    <div className="bg-background w-screen h-screen text-textPrimary">
      <TopBar />
      <div className="border-y-6 border-x-8 px-2 py-6 border-background w-screen h-fit">
        <div className="flex flex-col bg-gray-500 w-full overflow-hidden rounded-3xl h-full items-start justify-start">
          <div className="w-full h-fit py-2 px-12 bg-gray-400 text-6xl">
            About
          </div>
          <div className="py-2 px-6 w-full h-fit text-3xl leading-15">
            Hi, my name is Diogo Piteira Castelos and I go online by{" "}
            <span className="text-red-700">Diogo</span>
            <span className="text-yellow-400">PC</span>
            <span className="text-green-900">astelos</span>. I am a 21 year-old
            student from Portugal, currently studying Computer Engineering {`(`}
            <FontAwesomeIcon className="text-primary" icon={faComputer} />
            {`)`} at the NOVA University of Lisbon and working as a Full-Stack
            Mobile and Web Software Developer at{" "}
            <span className="font-semibold">
              Associação In-Nova - Consultoria Júnior da Nova School of Science
              and Technology
            </span>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

export default Works;
