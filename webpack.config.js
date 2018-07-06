// By rebey.cn 2018-07-05

const es3ifyPlugin = require('es3ify-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const path = require('path');

module.exports = {
  entry: [
    "babel-polyfill",
    "./src/index.js"
  ],
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, 'dist')
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
              presets: [["env", {
                  module: false,
                  target: {
                    browsers: ["> 1%", "last 2 versions", "not ie < 8"]
                  }
                }]
                , "react", "stage-2"
              ],
              plugins: ["transform-runtime"]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      // 'react': 'anujs',
      //'react-dom': 'anujs',
      // 若要兼容 IE 请使用以下配置
      'react': 'anujs/dist/ReactIE',
      'react-dom': 'anujs/dist/ReactIE',
      // 如果引用了 prop-types 或 create-react-class
      // 需要添加如下别名
      'prop-types': 'anujs/lib/ReactPropTypes',
      'create-react-class': 'anujs/lib/createClass',
      //如果你在移动端用到了onTouchTap事件
      //'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',
     }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ie8: true,
          compress: {
            properties: false
          },
          // output: {
          //   beautify: false,
          //   comments: true
          // },
        }
      })
    ]
  },
  plugins: [
    new es3ifyPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
