import createMDX from "@next/mdx";

const nextConfig = {
  allowedDevOrigins: ["192.168.191.3"],
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
