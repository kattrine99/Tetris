const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/ts/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src', 'js'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, 
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
