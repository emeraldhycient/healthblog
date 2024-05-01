import React from "react";
import HeroImg from "@src/assets/images/marketplace-hero.png";
import HeroMobileImg from "@src/assets/images/marketplace-hero-mobile.png";

export const MarketPlaceHero = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:p-2 justify-between lg:border lg:border-borderColor lg:rounded-md mt-7">
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="text-black">
          <h1 className="lg:text-3xl text-lg mb-4">
            Latest trending <br />
            <span className="font-medium">Electronic items</span>
          </h1>
          <button className="bg-white text-black px-4 py-2 rounded-md">
            Learn More
          </button>
        </div>
      </div>
      <ul className="flex flex-row lg:flex-col">
        <li>Automobile</li>
        <li>Clothes & Wear</li>
        <li>Home Interiors</li>
        <li>Computer and tech</li>
        <li>Tools, equipments</li>
        <li>Sports and outdoors</li>
        <li>Animal and pets</li>
        <li>Machinery tools</li>
      </ul>
      <img
        src={HeroImg}
        alt="hero"
        className="lg:max-w-[70%] hidden lg:block"
      />
      <img
        src={HeroMobileImg}
        alt="mobile hero"
        className="lg:max-w-[70%] block lg:hidden"
      />
    </div>
  );
};
