// This config is for building dist files
const webpack = require('webpack');
const getWebpackConfig = require('./antd-tools/getWebpackConfig');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better
// http://stackoverflow.com/q/25384360
function ignoreMomentLocale (webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function addLocales (webpackConfig) {
  let packageName = 'antd-with-locales';
  if (webpackConfig.entry['antd.min']) {
    packageName += '.min';
  }
  webpackConfig.entry[packageName] = './index-with-locales.js';
  webpackConfig.output.filename = '[name].js';
}

function externalMoment (config) {
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
}

//添加 vueloader plugin  是的 可以使用.vue 格式编写组件 
function addVueLoaderPlugin (webpackConfig) {
  webpackConfig.plugins.push(new VueLoaderPlugin());

}

const webpackConfig = getWebpackConfig(false);
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);
    addLocales(config);
    addVueLoaderPlugin(config);

  });
}

module.exports = webpackConfig;
