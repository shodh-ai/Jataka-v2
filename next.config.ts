import type { NextConfig } from "next";

/** Mintlify docs site — override locally with NEXT_PUBLIC_DOCS_URL=http://localhost:3003 */
const docsUrl = (process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.jataka.io").replace(
  /\/$/,
  ""
);

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs",
        destination: docsUrl,
        permanent: false,
      },
      {
        source: "/docs/:path*",
        destination: `${docsUrl}/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
