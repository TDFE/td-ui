/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-05-16 11:52:14
 * @Last modified by:   yzf
 * @Last modified time: 2017-05-16 11:52:18
 */

const ENV = process.env.NODE_ENV;
if (ENV !== 'production' &&
    ENV !== 'test' &&
    typeof console !== 'undefined' &&
    console.warn &&
    typeof window !== 'undefined') {
  console.warn(
    'You are using a whole package of td-ui, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.'
  );
}

export { default as Button } from './button';

export { default as Input } from './input';

export { default as Icon } from './icon';

export { default as Loading } from './loading';

export { default as Dialog } from './dialog';

export { default as Message } from './message';

export { default as Breadcrumb } from './breadcrumb';
