import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const config = {
 // configs
 reactStrictMode: true,
};

const withMDX = createMDX({
  // customise the config file path
  

});

export default withMDX(config);