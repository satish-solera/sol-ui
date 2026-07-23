"use client";

import * as React from "react";
import { Hamburger } from "../../../components/svgs";

export default function Header() {
  const [smallNav, setSmallNav] = React.useState<boolean>(false);
  return (
    <header className="flex items-center justify-between bg-white/70 px-2 py-1 ">
      <p className="font-serif text-[15px] font-semibold tracking-[-0.02em]">
        sola
      </p>
      <nav aria-label="Primary" className="hidden md:block">
        <div className="flex gap-3 items-center">
          <ul className="hidden items-center gap-6 text-[13px] text-[#57534E] sm:flex">
            {["Home", "Products", "Treasury", "Pricing"].map((item) => (
              <li key={item}>
                <a
                  className="transition-colors duration-200 hover:text-[#0C0A09]"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="active:scale-[101%] delay-100 cursor-pointer rounded-[6px] transform-gpu will-change-transform  px-3.5 py-1 text-[13px] font-medium text-white transition-all duration-200 bg-[#0C0A09] hover:bg-[#0C0A09]/90   "
            type="button"
          >
            Sign in
          </button>
        </div>
      </nav>
      {/* smaller devices */}
      <div className="block md:hidden">
        <div>
          <button
            onClick={() => setSmallNav((prev) => !prev)}
            className="w-10 h-10  flex items-center justify-center"
          >
            <span className={`text-neutral-500 active:text-black ${smallNav && "text-black"}`}>
              <Hamburger />
            </span>
          </button>
        </div>
        {smallNav && (
          <div className="absolute flex-col gap-4 left-0 z-50 bg-white w-full h-fit pb-10 border-b border-gray-100">
            <ul className="items-center  text-[13px] text-[#57534E] flex-col">
              {["Home", "Products", "Treasury", "Pricing"].map((item) => (
                <a
                    className="transition-colors duration-200 hover:text-[#0C0A09]"
                    href="#"
                  >
                <li key={item}>
                    {item}
                </li>
                  </a>
              ))}
            </ul>

            <button
              className="mt-2 active:scale-[101%] delay-100 cursor-pointer rounded-[6px] transform-gpu will-change-transform  px-3.5 py-1 text-[13px] font-medium text-white transition-all duration-200 bg-[#0C0A09] hover:bg-[#0C0A09]/90   "
              type="button"
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
