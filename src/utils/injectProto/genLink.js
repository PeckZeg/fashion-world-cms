/**
 *  详情页链接
 *  @param {object} entry 条目
 */
export default function(entry) {
  return `/${this.state.entryProp}/${entry._id}`;
};
