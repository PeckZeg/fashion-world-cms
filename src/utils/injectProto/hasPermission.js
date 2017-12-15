import includes from 'lodash/includes';
import isArray from 'lodash/isArray';
import toUpper from 'lodash/toUpper';
import reduce from 'lodash/reduce';
import get from 'lodash/get';

/**
 *  检查权限
 *  @param {...string} 待检查的权限
 *  @returns {boolean} 是否拥有权限
 */
export default function(...permission) {
  const permissions = get(this, 'props.my.profile.permissions');

  if (isArray(permissions)) {
    return reduce(permission, (hasPermission, permission) => (
      hasPermission && includes(permissions, toUpper(permission))
    ), true);
  }

  return false;
};
