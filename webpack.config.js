module.exports = {
    entry: {
        main: ['./src/scripts/index.js']
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
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['env', { 
                            modules: false,
                            targets: {
                                node: 'current'
                            }
                        }]
                    ]
                }
            }
        ]
    }
};