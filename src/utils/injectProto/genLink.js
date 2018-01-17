import kebabCase from 'lodash/kebabCase';

/**
 *  详情页链接
 *  @param {object} entry 条目
 *  @param {string} pathname 子路径
 */
export default function(entry, pathname = '') {
  return `/${kebabCase(this.state.entryProp)}/${entry._id}${pathname}`;
};
