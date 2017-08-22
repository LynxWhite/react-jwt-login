const ManifestPlugin     = require('webpack-manifest-plugin')
const ExtractTextPlugin  = require('extract-text-webpack-plugin')
const extractStylus      = new ExtractTextPlugin('style-stylus.css')
const extractSass        = new ExtractTextPlugin('style-sass.css')

module.exports = {
    plugins: [
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        }),
        extractStylus,
        extractSass
    ],
    resolve: {
        extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx']
    },
    module: {
        strictExportPresence: true,
        rules: [{ 
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        },
        {
            test: /\.(png|jpg|svg|ico|cur|ani)$/,
            use: ['file-loader?name=images/[name].[ext]']
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        },
        {
            test: /\.styl$/,
            loader: extractStylus.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'stylus-loader']
            })
        },
        {
            test: /\.(scss|sass|css)$/,
            loader: extractSass.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }
        ]
    }
}
