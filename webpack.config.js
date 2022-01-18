const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [new ESLintPlugin(options)],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        loaders: [
            {exclude: ['node_modules'], loader: 'babel', test: /\.jsx?$/},
            {loader: 'style-loader!css-loader', test: /\.css$/},
            {loader: 'url-loader', test: /\.gif$/},
            {loader: 'file-loader', test: /\.(ttf|eot|svg)$/},
          ],
        },
        resolve: {
          alias: {
            config$: './configs/app-config.js',
            react: './vendor/react-master',
          },
          extensions: ['', 'js', 'jsx'],
          modules: [
            'node_modules',
            'bower_components',
            'shared',
            '/shared/vendor/modules',
          ],
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};