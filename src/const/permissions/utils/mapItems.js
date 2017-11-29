import map from 'lodash/map';

/**
 *  映射权限列表
 *  @param {object} 权限字典
 *  @returns {object[]} 权限字典，其中 `object` 中为 { key, label }
 *                      `key` 为权限，`label` 为权限名称
 */
export default items => map(items, (label, key) => ({ key, label }));
