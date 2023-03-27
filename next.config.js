/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@tldraw/tldraw", "@tldraw/core"],
	output: "standalone",
};

module.exports = nextConfig;
