import Detail from './Detail';
import Edit from '../Edit';

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
