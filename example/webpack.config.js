const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');

const plugins = [

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
  }),

  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
  }),

  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    },
  }),
];

const rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /(node_modules)/,
  },
  {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: /(node_modules)/,
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader'],
  },
  {
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /\.(eot|ttf|svg|woff|woff2)(\?\S*)?$/,
    loader: 'file-loader',
  },
];

const config = {
  context: path.join(__dirname, 'app'),
  entry: {
    vendor: './vendor.js',
    app: './app.module.js',
  },
  output: {
    path: `${__dirname}/app`,
    filename: './bundle.js',
  },
  plugins,
  node: {
    fs: 'empty',
    tls: 'empty',
  },
  module: {
    rules,
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080',
      },
    },
    host: '0.0.0.0',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.output.path = `${__dirname}/dist`;
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.devtool = 'eval';
}

module.exports = config;
