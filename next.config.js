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
                port: '8080'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '10443'
            },
        ]
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern"
                silenceDeprecations: ['mixed-decls'],
            }
        }
    }
};
