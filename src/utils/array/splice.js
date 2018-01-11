import isArray from 'lodash/isArray';

/**
 *  强化 Array#splice
 *  @param {Array} array
 *  @param {number} start
 *  @param {number} deleteCount
 *  @param {...*} items
 *  @returns {Array}
 */
export default function(array, start, deleteCount, ...items) {
  if (!isArray(array)) return [];

  array = array.slice();
  array.splice(start, deleteCount, ...items);

  return array;
};
