const path = require('path')
const glob = require('glob')
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const PACKAGES_DIR = path.resolve(__dirname, './packages')

function getPackageName(file) {
  return path.relative(PACKAGES_DIR, file).split(path.sep)[0]
}

const componentPackages = glob.sync(path.resolve(PACKAGES_DIR, '*-component'))
const storePackages = glob.sync(path.resolve(PACKAGES_DIR, '*-store'))
const packages = componentPackages.concat(storePackages)
/* eslint-disable no-param-reassign */
const entries = packages.reduce((obj, p) => {
  const name = getPackageName(p)
  obj[name] = path.resolve(p, 'src/index.js')
  return obj
}, {})
/* eslint-enable no-param-reassign */

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname),
    filename: './packages/[name]/dist/index.js',
    libraryTarget: 'umd',
  },
  // we define here the devtool used to build the source map very useful
  // for development
  // using the source map produces a larger bundle file
  // devtool: 'cheap-module-eval-source-map',
  externals: [
    /^@4geit\/[a-zA-Z\-0-9]+$/,
    'angular',
    /^rct-[a-zA-Z\-0-9]+$/,
    /^autosuggest-highlight\/[a-zA-Z\-0-9]+$/,
    /^babel-runtime\/[a-zA-Z\-0-9]+$/,
    'classnames',
    'csvtojson',
    'fbjs',
    'keycode',
    'material-ui',
    /^material-ui\/[a-zA-Z\-0-9]+$/,
    /^material-ui\/[a-zA-Z\-0-9]+\/[a-zA-Z\-0-9]+$/,
    'material-ui-icons',
    /^material-ui-icons\/[a-zA-Z\-0-9]+$/,
    'mobx',
    'mobx-react',
    'moment',
    'moment-timezone',
    'prop-types',
    'rc-slider',
    'react',
    /^react-[a-zA-Z\-0-9]+$/,
    'react2angular',
    'recompose',
    /^recompose\/[a-zA-Z\-0-9]$/,
    'swagger-client',
    'typeface-roboto',
  ],
  resolve: {
    mainFields: ['src:module', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      // js and jsx
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!@4geit\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react-app'],
            plugins: ['transform-decorators-legacy'],
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
  plugins: [
    new Dotenv({ path: path.resolve('.env.local') }),
    new Dotenv({ path: path.resolve('.env') }),
  ],
}
