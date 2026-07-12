import Hero from "@/src/sections/hero";
import { ComponentDemoSection } from "@/src/sections/section2";

export default function Home() {
  return (
      <div className=" min-h-screen  ">
        <Hero />

        <ComponentDemoSection />
      </div>
  );
}
