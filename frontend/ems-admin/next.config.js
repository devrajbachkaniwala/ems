/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/users',
        destination: '/',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
