module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // This preset already includes syntax-jsx
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './assets',
            '@src': './src',
          },
        },
      ],
      'react-native-reanimated/plugin', // Usually required if you use reanimated
    ],
  };
};