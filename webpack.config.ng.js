const path = require('path')
const glob = require('glob')
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack')
const vendors = require('./packages/rct-ng-vendor/vendors')

const PACKAGES_DIR = path.resolve(__dirname, './packages')

// provide the package name
function getPackageName(file) {
  return path.relative(PACKAGES_DIR, file).split(path.sep)[0]
}

// we only select the component packages
const packages = glob.sync(path.resolve(PACKAGES_DIR, '*-component'))
// and we select the index.ng.js file of each package
/* eslint-disable no-param-reassign */
const entries = packages.reduce((obj, p) => {
  const name = getPackageName(p)
  obj[name] = path.resolve(p, 'src/index.ng.js')
  return obj
}, {})
/* eslint-enable no-param-reassign */

entries['rct-ng-vendor'] = vendors

module.exports = {
  // we pass an array of all the candidate packages we want to build
  entry: entries,
  // output setup
  output: {
    path: path.resolve(__dirname),
    filename: './packages/[name]/dist/index.ng.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'rct-ng-vendor',
    }),
  ],
  // we define here the devtool used to build the source map very useful
  // for development
  // using the source map produces a larger bundle file
  // devtool: 'cheap-module-eval-source-map',
  //
  // we only exclude angular from the bundles since we can only have a
  // single angularjs instance in an app
  externals: [
    'angular',
  ],
  resolve: {
    mainFields: ['src:module', 'browser', 'module', 'main'],
    alias: {
      mobx: path.resolve('./node_modules/mobx'),
    },
  },
  // fix this issue https://gitlab.com/adventurebucketlist/react-packages/merge_requests/210
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      // js and jsx
      {
        test: /\.jsx?$/,
        // we exclude all the node_modules dependences but @4geit to to use
        // the source files
        exclude: /node_modules\/(?!@4geit\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react-app'],
            plugins: [
              'transform-decorators-legacy',
              // 'angularjs-annotate',
            ],
          },
        },
      },
      // css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  watchOptions: {
    poll: true,
  },
}
