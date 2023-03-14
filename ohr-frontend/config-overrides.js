const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        util: require.resolve('util/'),
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );
    const de = dotenv.config().parsed;
    config.plugins.push(
        new webpack.DefinePlugin(Object.keys(de).reduce((prev, next) => {
            prev[`process.env.${next}`] = JSON.stringify(de[next]);
            return prev;
        }, {})),
    );

    return config;
}