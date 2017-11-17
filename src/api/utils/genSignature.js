import encBase64 from 'crypto-js/enc-base64';
import encUtf8 from 'crypto-js/enc-utf8';
import SHA1 from 'crypto-js/sha1';

/**
 *  生成 API 签名
 *  @param {string} action 接口动作
 *  @param {object} token 令牌
 *  @param {string} token.apiKey
 *  @param {string} token.secretKey
 *  @returns {object} 一个可扩展的 headers 对象
 */
export default (action, token) => {
  const { apiKey, secretKey } = token;
  const timestamp = +new Date();
  const signature = SHA1(
    `?action=${action}&apiKey=${apiKey}&secretKey=${secretKey}&timestamp=${timestamp}`
  ).toString(encBase64);
  const authorization = encBase64.stringify(
    encUtf8.parse(
      `${apiKey}:${signature} ${timestamp}`
    )
  );

  return { Authorization: `Caa ${authorization}` };
};
