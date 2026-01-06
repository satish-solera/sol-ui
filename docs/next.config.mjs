
import nextra from 'nextra';

const withNextra = nextra({
    contentDirBasePath: '/docs'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    // devIndicators: { buildActivity: false },

};

export default withNextra(nextConfig);