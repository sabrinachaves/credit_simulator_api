module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@application': './src/application',
          '@infrastructure': './src/infrastructure',
          '@domain': './src/domain',
          '@config': './src/config',
          '@useCases': './src/useCases',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-flow-strip-types'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  ignore: ['**/*.test.ts'],
};
