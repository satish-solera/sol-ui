"use client";
import { PackageManagers } from "@/src/components/docs/package-manager";
import { motion, useAnimate } from "motion/react";
import { useState } from "react";

export const BrandInformationSection = () => {
  return (
    <section>
      <div className="pl-3  min-h-screen pt-20">
        <h1 className="md:w-[700px] tracking-tight">
          <span className="text-[20px] md:text-[40px] text-cyan-900">
            Design your UI with our changale, intractive designes
          </span>
        </h1>

        <div className="pt-10">
          <div className="grid grid-cols-1  lg:grid-cols-3 h-[450px]">
            <div className="col-span-2 border ">
              <div className="lg:w-[550px] pl-3">
                <span className="text-[24px] md:text-[40px]">
                  Fast with CLI & Package Managers
                </span>
               <div className="my-20 ">
                 <PackageManagers
                  commands={{
                    npm: "npm install -g solui",
                    yarn: "yarn global add solui",
                    pnpm: "pnpm add -g solui",
                    bun: "bun add -g solui",
                  }}
                />
                <PackageManagers
                  commands={{
                    cli: "npx solui@latest add <Component>",

                  }}
                />
               </div>
              </div>
            </div>
            <div className="col-span-1 border ">
              <div className="pl-3">
                <span className="text-[24px] md:text-[40px]">
                  Change what <br /> you love
                </span>
              </div>
              <div className="">
                <CollasibleVerticalCards />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const imgCardsData = [
  {
    img: "/image3.jpg",
  },
  {
    img: "/image4.jpg",
  },
  {
    img: "/image6.jpg",
  },
];
export const CollasibleVerticalCards = () => {
  return (
    <motion.div className="w-80 mx-auto ">
      <div className="gap-2 flex flex-col pt-2  ">
        {imgCardsData.map((el, id) => {
          return (
            <motion.div
              key={id}
              whileHover={{
                scale: [1.02, 1.01],
              }}
              transition={{
                duration: 0.3,
                ease: "linear",
              }}
              className="h-12 rounded-[4px] overflow-hidden photo-card"
             
            >
              <img src={el.img} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
