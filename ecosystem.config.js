module.exports = {
  apps: [
    {
      name: 'server-hire',
      script: 'dist/index.js',
      watch: true,
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
