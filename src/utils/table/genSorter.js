import camelCase from 'lodash/camelCase';

/**
 *  生成排序器
 *  @param {object} query 查询对象
 *  @param {string} prop 查询属性
 *  @returns {object} 排序器
 */
export default function(query, prop) {
  let sorter = true;
  let sortOrder = false;

  switch (query[camelCase(`sort-${prop}`)]) {
    case -1:
    case '-1':
      sortOrder = 'descend';
      break;

    case 1:
    case '1':
      sortOrder = 'ascend';
      break;

    default:
      sortOrder = false;
  }

  return { sorter, sortOrder };
};
