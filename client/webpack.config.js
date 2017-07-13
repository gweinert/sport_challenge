const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

const plugins = [
  new ExtractTextPlugin({
    filename: './bundle.css',
    allChunks: true,
  }),
];

console.log("DIRNAME", path.resolve(__dirname, './'));

module.exports = function webpackStuff(env) {
  if (env === 'production') plugins.push(new BabiliPlugin());

  return {
    entry: [
      './src/index.js',
      './styles/app.scss',
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './'),
      publicPath: '/dist/'
      // path: __dirname
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
          ],
          plugins: [],
        },
        include: [
          path.resolve(__dirname, './'),
        ],
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      }, {
        test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                  // {  loader: "style-loader"}, // creates style nodes from JS strings {
                        { loader: "css-loader" },// translates CSS into CommonJS
                        { loader: "sass-loader" }, // compiles Sass to CSS
                        { loader: "import-glob-loader" }
                      ]
            })
      }],
    },
    plugins,
    devtool: "cheap-eval-source-map",

    devServer: {
      contentBase: path.resolve(__dirname, './'),
      compress: true,
      port: 8080,
      historyApiFallback: true
    }
  };
};
