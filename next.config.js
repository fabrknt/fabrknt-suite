/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: [
        // "@fabrknt/ui",
        // "@fabrknt/auth",
        // "@fabrknt/db",
        // "@fabrknt/api",
        // "@fabrknt/blockchain",
    ],
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },
    // Empty turbopack config to silence Next.js 16 warning
    turbopack: {},
    webpack: (config, { isServer }) => {
        // Ignore React Native dependencies that MetaMask SDK tries to import
        config.resolve.fallback = {
            ...config.resolve.fallback,
            "@react-native-async-storage/async-storage": false,
            "react-native": false,
        };

        // Ignore React Native modules in node_modules (both server and client)
        config.resolve.alias = {
            ...config.resolve.alias,
            "@react-native-async-storage/async-storage": false,
        };

        // Ignore problematic modules during build
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
                "@react-native-async-storage/async-storage": false,
            };
        }
        return config;
    },
};

module.exports = nextConfig;
