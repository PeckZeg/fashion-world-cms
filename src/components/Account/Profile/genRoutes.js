import Edit from '~/src/components/Account/Edit';
import Detail from './Detail';

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
