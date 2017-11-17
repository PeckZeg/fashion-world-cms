/**
 *  包装响应数据
 *  @param {Promise} promise 由 axios 生成的数据
 *  @returns 响应数据
 */
export default promise => promise.then(({ data }) => data);
