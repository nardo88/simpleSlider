const path = require('path')

module.exports = {
    entry: './src/index.js',
    devServer: {
        open: true,
        port: 8085,
        hot: true,
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'production',
    module: {
        rules : [
            {
                test : /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    },
                },
                exclude: /node_modules/,
            }
        ]
    }
};