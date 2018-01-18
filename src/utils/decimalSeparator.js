/**
 *  增加千分位
 *  @param {*} value 待转换的值
 *  @param {string} [separator = ","] 分隔符
 *  @return {string}
 */
export default function decimalSeparator(value, separator = ',') {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
