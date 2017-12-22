import replace from 'lodash/replace';

/**
 *  格式化手机字符串
 *  @param {string} mobile 手机号码
 *  @returns {string} 格式化后的手机号码
 */
export default mobile => replace(
  mobile,
  /^(\d{3})(\d{4})(\d{4})$/,
  '$1-$2-$3'
);
