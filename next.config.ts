import type { NextConfig } from "next";

const isProd = process.env.GITHUB_ACTIONS === "true";
const repoName = "yoichiWebSite";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
