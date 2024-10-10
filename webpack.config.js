const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

const commonConfig = isDevelopment => ({
    entry: path.join(__dirname, 'src', 'index.js'), 
    module: {
        rules:[
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s*[ac]ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sourceMap: isDevelopment
                        }
                    }
                ]            
            },
            {
                test: /\.(jpg|png|gif|woff|woff2|eot|ttf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }           
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        }
                    }
                ]          
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
});


const developmentConfig = {
    output: {
        filename: 'bundle.js',
        publicPath: '/',
    },
    devServer: {
        port: 3000,
        compress: true
    },
    devtool: 'inline-source-map'
};


const productionConfig = {
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/',
        filename: '[name].[fullhash].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'template.html'),
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            chunkFilename: '[id].[fullhash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, '/public'),
                    to: path.join(__dirname, '/build'),
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        })
    ]
};



module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    
    const envi = dotenv.config().parsed;

    console.log('envi', envi);

    // reduce it to a nice object, the same as before
    // const envKeys = Object.keys(env).reduce((prev, next) => {
    // prev[`process.env.${next}`] = JSON.stringify(env[next]);
    // return prev;
    // }, {});

    return Object.assign(commonConfig(isDevelopment), isDevelopment ? developmentConfig : productionConfig);

};