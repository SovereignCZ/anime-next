/** @type {import('next').NextConfig} */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = {
    images: {
        remotePatterns: [
            {
                hostname: '**',
                port: '**',
                pathname: '**'
            },
        ],
    }
};
