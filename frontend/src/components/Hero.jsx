import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col border border-gray-400 sm:flex-row">
      
      <div className="flex items-center justify-center w-full py-10 sm:w-1/2 sm:py-0">
        <div className="text-[#414141] flex flex-col items-center justify-center gap-4">
          {/* Logo Image */}
          <img
            className="w-4/5 sm:w-4/5 md:w-3/4"
            src={assets.logo}
            alt="Fashion World Logo"
          />

          
        </div>
      </div>

      {/* Hero right side */}
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="Hero Image" />
    </div>
  );
};

export default Hero;
