const nextTranslate = require('next-translate')
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   optimizeFonts: true,
   
  
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//       },
//     ],
//     minimumCacheTTL: 1500000,
//   },
// };
module.exports = nextTranslate({
   
  reactStrictMode: false,
  swcMinify: true,
  optimizeFonts: true,
   
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    minimumCacheTTL: 1500000,
  },
})
//  module.exports = nextConfig;