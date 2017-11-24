import isNumber from 'lodash/isNumber';
import reduce from 'lodash/reduce';
import omit from 'lodash/omit';

/**
 *  图片裁剪
 *    https://developer.qiniu.com/dora/manual/3683/img-directions-for-use
 *    https://developer.qiniu.com/dora/manual/1279/basic-processing-images-imageview2
 *  @param {string} url 图片地址
 *  @param {string} [type = 'imageView2'] 图片处理类型
 *  @param {object} params 处理参数
 *  @param {string} [params.mode = 1] 处理模式
 */
export default (url, ...args) => {
  let type = 'imageView2';
  let params = {};

  if (!url) return null;

  switch (args.length) {
    case 1:
      [params] = args;
      break;

    case 2:
      [type, params] = args;
      break;


    default:
      // ...
  }

  let mode = isNumber(params.mode) ? params.mode : 1;
  let query = [type, mode];

  query = reduce(omit(params, 'mode'), (query, value, key) => {
    query.push(`${key}/${value}`);
    return query;
  }, query).join('/');

  return `${url}?${query}`;
};
