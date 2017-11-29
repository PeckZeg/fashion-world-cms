import startsWith from 'lodash/startsWith';
import camelCase from 'lodash/camelCase';
import reduce from 'lodash/reduce';

/**
 *  混入排序查询对象
 *  @param {object} sorter 排序对象
 *  @param {object} [query] 查询对象
 */
export default function(query, sorter) {
  query = reduce(query, (query, value, key) => {
    if (!startsWith(key, 'sort')) {
      query[key] = value;
    }

    return query;
  }, {});

  const { columnKey, order } = sorter;

  if (columnKey) {
    const key = camelCase(`sort-${columnKey}`);
    let value;

    switch (order) {
      case 'ascend':
        value = 1;
        break;

      case 'descend':
        value = -1;
        break;

      default:
        // ...
    }

    if (key && value) {
      query[key] = value;
    }
  }

  return query;
};
