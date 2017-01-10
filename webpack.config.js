var webpack = require('webpack'); // eslint-disable-line
var dev = process.env.NODE_ENV !== 'production'; // eslint-disable-line
var path = require('path'); // eslint-disable-line
module.exports = {
    devtool: dev ? '' : 'source-map',
    entry: path.join(__dirname, 'src/gnal.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: dev ? 'gnal.js' : 'gnal.min.js',
        library: 'Gnal',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        root: path.resolve('./src'),
        extension: ['', '.js'],
    },
    plugins: dev ? [] : [
        new webpack.optimize.UglifyJsPlugin(),
    ],
};
