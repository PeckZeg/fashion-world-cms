/**
 *  生成路由项目
 *  @param {...object} conf 路由配置项目
 *  @returns {Array} 路由项目表
 */
export default (...conf) => conf.map(config => ({
  key: config.pathname.replace(/^\/api\/admin/, '/docs/api'),
  method: config.method,
  label: config.title,
  config
}));
