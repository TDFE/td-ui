/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-15 18:54:41
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-15 18:54:44
 */

import { execSync } from 'child_process';
import gulpLogger from 'gulp-logger';
import filter from 'gulp-filter';
import through2 from 'through2';
import babel from 'gulp-babel';
import shell from 'shelljs';
import merge2 from 'merge2';
import gulp from 'gulp';
import path from 'path';

import transformLess from './utils/transformLess';
import logger from './utils/logger';

function babelify(js, dest) {
  return js
    .pipe(filter(file => file.path.indexOf('demo') === -1 && file.path.indexOf('_test_') === -1))
    .pipe(gulpLogger({
      beforeEach: 'Begin to compile ',
      colors: true
    }))
    // .pipe(babel({
    //   presets: [
    //     'es2015-ie',
    //     'react',
    //     'stage-2',
    //   ],
    //   plugins: [
    //     'transform-decorators-legacy',
    //     'transform-class-properties',
    //     'transform-runtime'
    //   ]
    // }))
    .pipe(through2.obj(function(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\/style\/index(\.web)?\.js/)) {
        const content = file.contents.toString(encoding);
        if (file.path.indexOf('.web.js') === -1 && content.indexOf('.less\'') === -1) {
          next();
          return;
        }
        file.contents = new Buffer(content
          .replace(/\/style\/?'/g, '/style/css\'')
          .replace(/\.less/g, '.css'));
        file.path = file.path.replace(/index(\.web)?\.js/, 'css$1.js');
        this.push(file);
        next();
      } else {
        next();
      }
    }))
    .pipe(gulp.dest(dest));
}

function compile(dir, dest) {
  const less = gulp.src([`${dir}/**/*.less`])
    .pipe(filter(file => file.path.indexOf('demo') === -1 && file.path.indexOf('_test_') === -1))
    .pipe(gulpLogger({
      beforeEach: 'Begin to compile ',
      colors: true
    }))
    .pipe(through2.obj(function(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/\/style\/index(\.web)?\.less$/)) {
        transformLess(file.path).then(css => {
          file.contents = new Buffer(css);
          file.path = file.path.replace(/\.less$/, '.css');
          this.push(file);
          next();
        }).catch(e => {
          logger.error(e);
        });
      } else {
        next();
      }
    }))
    .pipe(gulp.dest(dest));
  const assets = gulp.src([`${dir}/**/*.@(png|svg|eot|svg|ttf|woff|woff2)`])
    .pipe(gulpLogger({
      beforeEach: 'Begin to compile ',
      colors: true
    }))
    .pipe(gulp.dest(dest));
  const js = babelify(gulp.src(`${dir}/**/*.js`), dest);
  return [less, js, assets];
}

gulp.task('compile', () => {
  const argv = require('yargs').parse(process.argv.slice(3));
  const allComponents = shell.ls('./components');
  const components = argv._;
  if (components.length) {
    let streams = [];
    components.forEach(item => {
      execSync(`rimraf lib/${item}`);
      streams = streams.concat(compile(`components/${item}`, `lib/${item}`));
    });
    return merge2(streams);
  } else {
    execSync('rimraf lib');
    return merge2(compile('components', 'lib'));
  }
});
