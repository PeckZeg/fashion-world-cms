/**
 *  延迟加载图片
 *  @param {string} src 图片地址
 *  @returns {Promise}
 */
export default src => new Promise((resolve, reject) => {
  if (!src) return reject(new Error('invalid image url'));

  const elem = document.createElement('img');

  elem.addEventListener('load', () => {
    resolve(src);
    elem.remove();
  });

  elem.addEventListener('error', err => reject(err));

  elem.src = src;
});
