const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require("webpack").container
const path = require("path");

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    output: {
        publicPath: "http://localhost:3001/",
        path: path.resolve(__dirname, ".dist")
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Transpile JS/JSX files
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: "headerApp",
            filename: "remoteEntry.js",
            exposes: {
                "./Header": "/src/Header.tsx"
            },
            shared: { react: { singleton: true, eager: true }, "react-dom": { singleton: true, eager: true } },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    devServer: {
        port: 3001,
        historyApiFallback: true,
        open: false,
        hot: true,
        static: {
            directory: path.join(__dirname, 'public')
        }
    },
}