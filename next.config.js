/** @type {import('next').NextConfig} */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.50.167',
                port: '**',
                pathname: '**'
            },
        ],
        domains: ['192.168.50.167'],
    }
};
