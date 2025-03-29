module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landingPage',
        permanent: true,
      },
    ];
  },
  swcMinify: true,
};