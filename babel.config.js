module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        root: '.',
        alias: {
          '~': ['./'],
          '@theme': ['./src/theme'],
          '@features': ['./src/features'],
          '@components': ['./src/components'],
          '@redux': ['./src/features/redux'],
          '@translations': ['./src/features/translations'],
          '@navigation': ['./src/features/navigation'],
          '@utils': ['./src/utils'],
          '@services': ['./src/features/services']
        },
      },
    ],
  ],
};
