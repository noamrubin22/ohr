const webpack = require('webpack');
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

    return config;
}