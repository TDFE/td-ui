/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-06-15 15:31:53
 * @Last modified by:   yzf
 * @Last modified time: 2017-06-19 14:48:46
 */

import warning from 'warning';

export default function FormControl({ name, children, form, ...others }) {
  warning(name, 'name should not be empty.');
  const { getFieldDecorator } = form;
  return getFieldDecorator(name, others)(children);
}
