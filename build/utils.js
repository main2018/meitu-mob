var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * dev-dispatch response console.log
 */
exports.respLogger = function (path, info) {
  if (process.env.NODE_ENV !== 'development') return
  let time = new Date().toLocaleString()
  let beginSign =  '\n[ ' + time + '  vue:POST "' + path + '" response: ' +  ']\n'
  console.log('\x1B[36m%s\x1B[0m', beginSign)
  console.log('\x1B[32m%s\x1b[0m:', info)
}

/**
 * dev-dispatch response console.log
 */
exports.postLogger = function (path, postJson) {
  if (process.env.NODE_ENV !== 'development') return
  let time = new Date().toLocaleString()
  console.log('\x1B[33m%s\x1B[0m', '\n>>>' + time + '  node:POST "' + path)
  console.log('\x1B[33m%s\x1b[0m:', JSON.stringify(postJson))
}

/**
 *
 */
exports.testLogger = function (info) {
  if (process.env.NODE_ENV !== 'development') return
  console.log(info)
}

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
