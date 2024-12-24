const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/app/main.ts',
  output: {
    uniqueName: 'footerApp',
    publicPath: 'http://localhost:4201/',
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'footerApp',
      filename: 'remoteEntry.js',
      exposes: {
        './FooterComponent': './src/app/footer/footer.component.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
  ],

  devServer: {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    open: true,
    port: 4201,
    historyApiFallback: true,
    compress: true,
    client: {
        logging: 'info',
    },
    headers: {
        'Access-Control-Allow-Origin': '*', // Add this line to allow cross-origin requests
    },
},

};
