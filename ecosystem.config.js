module.exports = {
  apps: [
    {
      name: 'server-hire',
      script: 'dist/app.js',
      watch: true,
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
