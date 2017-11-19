import MD5 from 'crypto-js/md5';

/**
 *  @class
 *  @classdesc MD5 哈希字符串构造器
 */
export default class MD5String {
  /** @constructs */
  constructor(value) {
    this.value = value;
  }

  /**
   *  将哈希转变为字符串
   *  @returns {string} 转换后的 MD5 值
   */
  toString() {
    return MD5(this.value).toString();
  }
}
