/**
 * @Author: xiaofei.wang <wxf>
 * @Date:   2017-06-02 16:32:58
 * @Last modified by:   wxf
 * @Last modified time: 2017-06-08 16:32:58
 */
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import ItemGroup from './itemGroup';

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.ItemGroup = ItemGroup;
export default Menu;
export { MenuItem, ItemGroup, SubMenu };
