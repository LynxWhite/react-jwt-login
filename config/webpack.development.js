
const path                     = require('path')
const webpack                  = require('webpack')
const HtmlWebpackPlugin        = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
module.exports = {
    entry: [
        require.resolve('react-dev-utils/webpackHotDevClient'),
        require.resolve('react-error-overlay'),
        './src/index.js'
    ],
    devtool: 'eval',
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true, // respond to 404s with index.html
        hot: true, // enable HMR on the server
        compress: true,
        inline: true,
        lazy: false,
        // quiet: true, // Убирает мусор из консоли о успешно собранных файлах
        overlay: {
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: path.resolve(__dirname, '../src/resources/icons/favicon.ico'),
            inject: true,
            minify: {
                html5: true
            }
        }),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        // See https://github.com/facebookincubator/create-react-app/issues/240
        new CaseSensitivePathsPlugin()
    ]
}
