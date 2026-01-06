import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "react-native-web/dist"

import { getPageMap } from "nextra/page-map";
import { Navbar as NavbarNextra, Layout } from "nextra-theme-docs";



const navbar = (
  <NavbarNextra logo={<b>Sol ui</b>}/>
)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sol-ui",
  description: "Make Your Android Screens Better with sol-ui",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout
  
        pageMap={await getPageMap()}>

    
        {children}
        
        </Layout>
      </body>
    </html>
  );
}
