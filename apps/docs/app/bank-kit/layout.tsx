import Navbar from "@/src/components/navbar";

export default async function BankRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar/>
      <div data-slot="layout" className="relative z-10 flex flex-col border-0 ">
        <div className="min-h-0 flex-1 ">{children}</div>
      </div>
    </>
  );
}
