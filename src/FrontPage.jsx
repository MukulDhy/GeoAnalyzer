import React, { useEffect, useRef } from "react";
import HomeVideo from "./Component/HomeVideo";
import aiLogo from "./public/Image/ai logo.jpg";
import aicteLogo from "./public/Image/aicte.png";
import computerVisionLogo from "./public/Image/computerVision.jpg";
import logoDeepLearningLogo from "./public/Image/logoDeepLearnign.png";
import momLogo from "./public/Image/mom.png";
import image from "./public/Image/images.png";
import digitalScaleHero from "./public/Image/digitalScaleHero.png";
import core from "./public/Video/core.mp4";
import analyseCore from "./public/Video/analyseCore.mp4";
import litho from "./public/Image/litho.png";
import crack from "./public/Image/crack.png";
import basalt from "./public/Image/basa.png";
const FrontPage = () => {
  return (
    <div>
      <div className="Hero">
        <div className="relative">
          <HomeVideo></HomeVideo>
          <div className="Title text-8xl absolute z-10 text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Core scanning to mine planning
            <span className="text-green-500 text-9xl">.</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-[rgb(27,24,47)] p-16 flex justify-between">
        <div class="relative ">
          <img src={aicteLogo} alt="ai logo" className="w-[80px] h-[80px]" />
          {/* <div class="absolute inset-0 bg-white opacity-50"></div> */}
        </div>
        <div class="relative ">
          <img
            src={logoDeepLearningLogo}
            alt="ai logo"
            className="w-[100px] h-[80px]"
          />
          {/* <div class="absolute inset-0 bg-white opacity-50"></div> */}
        </div>
        <div class="relative ">
          <img src={momLogo} alt="ai logo" className="w-[80px] h-[80px]" />
          {/* <div class="absolute inset-0 bg-white opacity-50"></div> */}
        </div>
        <div class="relative ">
          <img src={image} alt="ai logo" className="w-[80px] h-[80px]" />
          {/* <div class="absolute inset-0 bg-white opacity-50"></div> */}
        </div>
        <div class="relative ">
          <img src={aicteLogo} alt="ai logo" className="w-[80px] h-[80px]" />
          {/* <div class="absolute inset-0 bg-white opacity-50"></div> */}
        </div>
      </div>

      {/* What is GeoScan */}

      <div className="w-full flex justify-center items-center p-28 pb-16 bg-[rgb(42,51,80)]">
        <h2 className=" max-w-screen-xl text-3xl text-white font-sans ">
        GeoScan, the cutting-edge web platform revolutionizing how geologists interpret core samples. Our AI-powered models harness advanced algorithms to swiftly identify lithologies and pinpoint discontinuities within drilled cores, unlocking invaluable insights with unprecedented speed and accuracy. Say goodbye to laborious manual analysis and embrace the efficiency of GeoScan as your trusted partner in geological exploration. Join us in shaping the future of geology, where precision meets innovation, only with GeoScan.
        </h2>
      </div>

      {/* What we are doing */}

      <div className="w-full bg-[rgb(27,24,47)] text-white">
        <div className="max-w-screen-xl mx-auto flex pt-32">
          <div className="w-3/5 bg-[rgb(27,24,47)]">
            <div className="flex flex-col gap-8">
              <h1 className="text-6xl">
              Unlocking Geological Secrets
                <span className="text-green-500">.</span>
              </h1>
              <p className="text-lg">
              At GeoScan, we make studying drilled core samples super simple. Our platform looks at things like textures, colors, pores, and patterns in the samples. We use smart AI technology to carefully examine every detail. This helps us understand what kind of rock it is and find any breaks or changes inside. Basically, we make it easy to learn important stuff about the Earth from these samples. With GeoScan, exploring geology is a breeze!
              </p>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5">
            <img src={digitalScaleHero} className="w-full" alt="" />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto flex pt-32">
          <div className="w-2/5 h-[500px]">
            <img src={litho} className="w-full h-full rounded-lg" alt="" />
          </div>

          <div className="ml-8 flex-1 bg-[rgb(27,24,47)]">
            <div className="flex flex-col gap-8 justify-center h-[500px]">
              <h1 className="text-6xl">
              Reveals Lithologies<span className="text-green-500">.</span>
              </h1>
              <p className="text-lg">
              GeoScan takes the guesswork out of identifying rock types in drilled core samples. Using advanced algorithms, our platform analyzes the samples and provides clear, labeled outputs indicating the specific lithologies present. Whether it's sedimentary, igneous, or metamorphic, GeoScan accurately categorizes the rocks, enabling geologists to swiftly interpret the geological history recorded in the cores. Say goodbye to uncertainty and hello to clarity with GeoScan's precise lithology analysis.
              </p>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto flex pt-32">
          <div className="w-3/5 bg-[rgb(27,24,47)]">
            <div className="flex flex-col gap-8">
              <h1 className="text-6xl">
              Detects Discontinuities
                <span className="text-green-500">.</span>
              </h1>
              <p className="text-lg">
              Unraveling the mysteries hidden within drilled core samples has never been more thrilling with GeoScan. Our cutting-edge platform goes beyond merely identifying rock types; it skillfully detects discontinuities within the cores, uncovering the dynamic geological narratives they hold. From fault lines to fractures, GeoScan meticulously maps out these disruptions, offering geologists invaluable insights into the Earth's intricate history. Experience the excitement of exploration with GeoScan as your trusted guide through the geological landscape.
              </p>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
          <div className="w-2/5 pl-5">
            <img src={crack} className="w-full" alt="" />
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto flex pt-32">
          <div className="w-2/5 h-[300px]">
            <img src={basalt} className="w-full h-full rounded-lg" alt="" />
          </div>

          <div className="ml-8 flex-1 pb-32 bg-[rgb(27,24,47)]">
            <div className="flex flex-col gap-8">
              <h1 className="text-6xl">
                Classify the Rocks<span className="text-green-500">.</span>
              </h1>
              <p className="text-lg">
              Embark on a journey of geological discovery with GeoScan as your trusted companion. Our state-of-the-art platform employs cutting-edge technology to meticulously analyze core samples, unveiling the diverse lithologies present within. From sedimentary layers to igneous formations, GeoScan provides detailed insights into the composition of the Earth's crust. Say goodbye to guesswork and hello to clarity with GeoScan, revolutionizing the way we understand rock formations. Explore with confidence and unlock the mysteries of the Earth's history like never before.
              </p>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out"
                >
                  Try Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center rounded-t-full items-center p-28 pb-16 bg-[rgb(42,51,80)]">
        <h2 className=" max-w-screen-xl text-3xl text-white font-sans ">
        "Experience the power of GeoScan and uncover the Earth's hidden treasures today. Join us in shaping the future of geological exploration, one discovery at a time."
        </h2>
      </div>


    </div>
  );
};

export default FrontPage;
