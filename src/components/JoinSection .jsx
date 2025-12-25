import React from "react";

const JoinSection = () => {
  return (
    <div className="bg-landing-color text-white py-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="text-center bg-landing-color border border-[#21f201] rounded-[32px] border-solid p-8">
        <h2 className="md:text-[3rem] md:leading-[3.5rem] text-3xl font-bold font-space  text-white mb-4">
          <span className="text-[#21f201]">Join</span> DFS Web Chain Today!
        </h2>
        <p className="text-[1.25rem] leading-[1.75rem] font-medium mb-8 text-[#C4C5CB] font-space ">
          Join your community to the DFS Web Chain, or create your own token.
        </p>
        <a
          href="#"
          className="inline-block bg-transparent border-2 border-[#21f201] text-white py-2 px-8 rounded-lg hover:bg-[#21f201] hover:text-black transition duration-300"
        >
          Issue Coin
        </a>
      </div>
    </div>
  );
};

export default JoinSection;
