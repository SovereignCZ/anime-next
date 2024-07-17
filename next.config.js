/** @type {import('next').NextConfig} */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = {
    images: {
        remotePatterns: [
            {
                hostname: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
                pathname: '/anime/data/**'
            },
        ],
    },
    basePath: '/anime',
    assetPrefix: "https://192.168.50.167/anime",
};
