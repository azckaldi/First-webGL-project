const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExctractPlugin = require('mini-css-extract-plugin')
const webpackMerge = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge(
    commonConfiguration,
    {
        mode: 'production',
        plugins:
        [
            new MiniCssExctractPlugin({
                filename: 'style.[hash].css'
            }),
            new CleanWebpackPlugin(['dist'], {root: path.resolve(__dirname, '..') })
        ],

        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        MiniCssExctractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.styl$/,
                    use:
                    [
                        MiniCssExctractPlugin.loader,
                        'css-loader',
                        'stylus-loader'
                    ]
                }
            ]
        }
    }
)