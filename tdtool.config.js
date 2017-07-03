process.env.NODE_ENV = 'production'

const path = require('path');
const Config = require('tdtool').Config;
const config1 = new Config({
  entry: './components/index',
  filename: 'td-ui.min.js',
  sourceMap: true,
  minimize: true,
  urlLoaderLimit: 1024,
  extends: [['react', {
    source: [path.resolve(process.cwd(), 'components')]
  }], ['less', {
    extractCss: 'td-ui.min.css'
  }]]
});
const config2 = new Config({
  entry: './components/index',
  filename: 'td-ui.js',
  sourceMap: true,
  extends: [['react', {
    eslint: true,
    source: [path.resolve(process.cwd(), 'components')]
  }], ['less', {
    extractCss: 'td-ui.css'
  }]]
});

module.exports = [config1.resolve(), config2.resolve()];
