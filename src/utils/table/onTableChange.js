import mixinSortQuery from '~/src/utils/table/mixinSortQuery';
import stringifyQuery from '~/src/utils/query/stringify';
import parseQuery from '~/src/utils/query/parse';

export default function(com, pagination, filters, sorter, querySchema) {
  const { history, match, location } = com.props;
  const { current, pageSize: limit } = pagination;
  const offset = current - 1;
  const query = mixinSortQuery({
    ...parseQuery(location.search, querySchema),
    offset,
    limit
  }, sorter);

  history.push(`${match.url}${stringifyQuery(query)}`);
};
