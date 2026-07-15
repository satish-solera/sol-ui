import { HeroOne } from "@sol-ui/bank-kit";

export default function BankKitPage() {
  return (
    <section>
      <div className="min-h-screen pt-20 px-10">
        <div>
          <h1 className="font-medium font-serif text-4xl/[2.5rem] tracking-normal">
            Build better banking experiences
          </h1>
          <p className="text-lg/6 text-[#08090a99] py-2">
            with our <span className="text-black">banking</span> and{" "}
            <span className="text-black">finicial</span> production
            <br />
            level UI and blocks
          </p>
        </div>
      </div>
      <HeroOne />
    </section>
  );
}
