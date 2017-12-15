import Detail from './Detail';
import Edit from '../Edit';

/**
 *  生成路由列表
 *  @param {React.Component} com 当前组件实例
 *  @returns {object[]} 路由列表
 */
export default function(com) {
  const { match: { url } } = com.props;

  return [
    {
      path: url,
      exact: true,
      Component: Detail
    },
    {
      path: `${url}/edit`,
      exact: true,
      Component: Edit
    }
  ];
};
