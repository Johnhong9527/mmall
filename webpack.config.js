const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './index.html'
});
module.exports = {
  entry: './src/index.jsx',
  resolve: {
    alias: {
      page: path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env'],
            cacheDirectory: true,
            plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]]
          }
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf)/,
        loader: 'url-loader?limit=30000&name=fonts/[hash:8].[name].[ext]'
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_module/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //         importLoaders: 1,
      //         sourceMap: true,
      //         localIdentName: '[path][name]__[local]--[hash:base64:5]'
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/style/resources.scss'
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};
