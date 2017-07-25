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

export { default as Breadcrumb } from './breadcrumb';

export { default as Button } from './button';

export { default as Carousel } from './carousel';

export { default as Cascader } from './cascader';

export { default as Checkbox } from './checkbox';

export { default as Row } from './row';

export { default as Col } from './col';

export { default as Collapse } from './collapse';

export { default as DatePicker } from './date-picker';

export { default as Dialog } from './dialog';

export { default as Dropdown } from './dropdown';

export { default as Form } from './form';

export { default as Icon } from './icon';

export { default as Input } from './input';

export { default as InputNumber } from './input-number';

export { default as Layout } from './layout';

export { default as Loading } from './loading';

export { default as Menu } from './menu';

export { default as message } from './message';

export { default as Pagination } from './pagination';

export { default as Popover } from './popover';

export { default as Progress } from './progress';

export { default as Radio } from './radio';

export { default as Rate } from './rate';

export { default as Select } from './select';

export { default as Slider } from './slider';

export { default as Steps } from './steps';

export { default as Switch } from './switch';

export { default as Table } from './table';

export { default as Tabs } from './tabs';

export { default as Tag } from './tag';

export { default as TimePicker } from './time-picker';

export { default as Timeline } from './timeline';

export { default as Tooltip } from './tooltip';

export { default as Transfer } from './transfer';

export { default as Tree } from './tree';

export { default as Upload } from './upload';
