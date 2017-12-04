/**
 *  插入一个值并返回一个新的数组副本
 *  @param {Array} arr 数组
 *  @param {*} elem 插入的元素
 *  @returns {Array} 返回一个新的数组
 */
export default function(arr, elem) {
  arr.unshift(elem);
  return arr.slice(0);
};
