import CheckPermissions from './CheckPermissions';
// children 真正的要 render 的组件
// children 可能也会代表菜单
// children 就是要处理的对象 权限匹配时 render 的组件或显示的菜单
// authority 代表对象的权限 会跟当前的权限进行比较 有可能是 ['admin', 'user']
// noMatch 权限匹配不通过时
const Authorized = ({ children, authority, noMatch = null }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  return CheckPermissions(authority, childrenRender, noMatch);
};

export default Authorized;
