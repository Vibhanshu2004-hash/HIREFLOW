/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    cpus: 1,
    workerThreads: true,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
    webpackBuildWorker: false
  }
};

export default nextConfig;
