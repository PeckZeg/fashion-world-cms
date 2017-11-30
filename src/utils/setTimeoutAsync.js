/**
 *  定时器异步方法
 *  @param {number} delay 延迟时间
 *  @returns {Promise}
 */
export default delay => new Promise(resolve => {
  setTimeout(resolve, delay);
});
