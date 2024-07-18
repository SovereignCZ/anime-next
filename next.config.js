/** @type {import('next').NextConfig} */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
                hostname: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
                port: process.env.NEXT_PUBLIC_SERVER_PORT,
                pathname: '/data/**'
            },
        ],
    }
};
