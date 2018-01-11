import EditSubtitleFiles from '../EditSubtitleFiles';
import Detail from '../Detail';
import AvInfo from '../Avinfo';
import Edit from '../Edit';

/**
 *  生成子路由
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
      path: `${url}/avinfo`,
      exact: true,
      Component: AvInfo
    },
    {
      path: `${url}/edit`,
      exact: true,
      Component: Edit
    },
    {
      path: `${url}/edit/subtitle-files`,
      exact: true,
      Component: EditSubtitleFiles
    }
  ];
};
