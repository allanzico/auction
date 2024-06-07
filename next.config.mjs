/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            }
        ],
    },
    env: {
        MAX_FETCH_SIZE: '100' // in MB
    },
};

export default nextConfig;