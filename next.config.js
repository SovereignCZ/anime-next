/** @type {import('next').NextConfig} */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.50.167',
            },
            {
                protocol: 'http',
                hostname: '192.168.50.37',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '82'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '10443'
            },
        ]
    },
    experimental: {
        turbo: {
            rules: {
                "*.scss": {
                    loaders: ["sass-loader"],
                    as: "*.css",
                },
            },
        }
    }
}