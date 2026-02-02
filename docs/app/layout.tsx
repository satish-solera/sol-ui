import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-native-web/dist";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import { RootProvider } from "fumadocs-ui/provider/next";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "./config/site";



const inter = Inter({
  variable:"--font-inter",
  subsets:["latin"]
})


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "React",
    "Next.js",
    "React Native UI",
    "Tailwind CSS",
    "solUI",
    "React Aria",
    "Server Components",
    "React Components",
    "UI Components",
    "UI Kit",
    "UI Library",
    "UI Framework",
    "UI Design System",
  ],
  twitter: siteConfig.twitter,
  openGraph: siteConfig.openGraph,
  authors: [
    {
      name: "SatishSolera",
      url: "https://x.com/SatishSolera",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable}  antialiased`}
      >
        <ThemeProvider attribute="class">
          <Navbar />
          <div className="border border-b-0  border-t-0 mx-1 md:mx-3">
            <RootProvider>{children}</RootProvider>
          <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
