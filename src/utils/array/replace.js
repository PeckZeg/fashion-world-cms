/**
 *  替换数组中的元素
 *  @param {Array} arr 待查询的数组
 *  @param {*} elem 待替换的元素
 *  @param {*} newElem 替换的元素
 *  @returns {Array} 替换成功返回一个新数组，否则返回原来的数组
 */
export default function(arr, elem, newElem) {
  const idx = arr.indexOf(elem);

  if (idx > -1) {
    arr.splice(idx, 1, newElem);
    return arr.slice();
  }

  return arr;
};
