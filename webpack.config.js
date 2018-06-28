module.exports = {
    entry: {
        main: ['./src/scripts/controller/indexController.js']
    },
    devtool: 'inline-source-map',
    output: {
      filename: 'bundle.js',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                use: [
                    {loader: 'babel-loader'}
                ]
            }
        ]
    }
};