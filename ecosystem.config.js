module.exports = {
  apps: [
    {
      name: 'server-hire',
      script: 'dist/apps/server-hire/src/app.js',
      interpreter: 'node',
      interpreter_args: ['-r', 'ts-node/register/transpile-only', '-r', 'tsconfig-paths/register'],
      watch: true,
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
