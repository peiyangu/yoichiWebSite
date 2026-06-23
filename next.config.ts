import type { NextConfig } from "next";

const isProd = process.env.GITHUB_ACTIONS === "true";
const repoName = "yoichiWebSite";
const basePath = isProd ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: isProd ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
