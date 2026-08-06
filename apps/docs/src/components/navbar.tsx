"use client";

import { IconMenu3, IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { SearchLinearIcon } from "./icons/searchIcon";
import * as React from "react";
import { SoluiNameLogo, SoluiNameLogoBlack } from "./svgs";
import { GithubIcon } from "./icons"

import { Button } from "./ui/button";

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="py-[11px] w-fit border-none hover:bg-white dark:hover:bg-black px-1 py-1"
      aria-label="Toggle theme"
      typeOfBtn={resolvedTheme == "light" ? "white" : "black"}
    >
      {theme == "light" ? (
        <IconMoon className="w-5 h-5" />
      ) : (
        <IconSun className="w-5 h-5" />
      )}
    </Button>
  );
};

const searchButton = (
  <button
    aria-label="Quick search"
    className="border px-3 border-default-200 rounded-lg text-small font-normal text-default-500 bg-transparent flex items-center py-[6px] gap-2"
  //   endContent={
  //     <Kbd
  //       className="hidden text-xs rounded-full py-0.5 px-1.5 lg:inline-block"
  //       keys={commandKey}
  //     >
  //       K
  //     </Kbd>
  //   }
  >
    <SearchLinearIcon
      className="text-base text-default-400 pointer-events-none shrink-0"
      size={16}
      strokeWidth={2}
    />
    Search
  </button>
);

function Navbar() {


  const [index, setIndex] = React.useState(0);
  const [isView, setIsView] = React.useState(false);

  return (
    <nav className="border border-l-0 border-r-0 border-t-0 border-b sticky top-0 bg-white/90 dark:bg-black/90 z-50">
      <div className=" py-5 md:px-8 px-4">
        {/* desktop nav */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between ">
            {/* solui name logo  */}
            <div className="">
              <div className="dark:hidden">
                <SoluiNameLogo />
              </div>
              <div className="dark:block hidden">
                <SoluiNameLogoBlack />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Link href="/docs/Installation">
                <p>
                  Docs
                </p>
              </Link>
              <Link
                href="https://github.com/satish-solera/sol-ui">
                <GithubIcon />
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* smaller devices nav */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between ">
            <div className="">
              <div className="dark:hidden">
                <SoluiNameLogo />
              </div>
              <div className="dark:block hidden">
                <SoluiNameLogoBlack />
              </div>
            </div>
            <div className="">
              <motion.button
                className="text-24 font-semibold border py-2 px-3 rounded-[4px] w-10 h-10  flex items-center justify-center "
                onClick={() => setIsView((prev) => !prev)}
              >
                <motion.span
                  initial={{
                    rotate: 0
                  }}

                  whileTap={{
                    rotate: -45
                  }}

                  transition={{
                    duration: 0.3,
                  }}
                  className=""
                >

                  <IconMenu3 />
                </motion.span>
              </motion.button>
            </div>
          </div>


          {
            isView && <div className="absolute bg-white dark:bg-black h-40 w-full border right-1 top-20 pl-3  ">
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/docs/Installation">
                  <p className="text-24 font-medium group-hover:-translate-y-px transition-all ease-linear  ">
                    Docs
                  </p>
                </Link>
                <Link href="https://github.com/satish-solera/sol-ui">
                  <p className="text-24 font-medium group-hover:-translate-y-px transition-all ease-linear  ">
                    Github
                  </p>
                </Link>
                <ThemeToggle />

              </div>
            </div>
          }

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
