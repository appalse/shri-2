var path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
              new CleanWebpackPlugin()
            ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'linter.js',
        library: 'lint',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    }
  };