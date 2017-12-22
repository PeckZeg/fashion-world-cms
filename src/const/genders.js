import filter from 'lodash/filter';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';

// 列表
export const GENDERS = [
  {
    key: 'unknown',
    label: '未知',
    // color: 'green',
    icon: 'question'
  },
  {
    key: 'secret',
    label: '秘密',
    // color: 'blue',
    icon: 'lock'
  },
  {
    key: 'male',
    label: '男',
    color: 'blue',
    icon: 'man'
  },
  {
    key: 'female',
    label: '女',
    color: 'pink',
    icon: 'woman'
  }
];

// 字典
export const GENDER_DICT = keyBy(GENDERS, 'key');

// 键列表
export const GENDER_KEYS = map(GENDERS, 'key');

/**
 *  获取性别
 *  @param {*} query 查询的值
 *  @param {object} [opts] 配置项
 *  @param {string} [opts.prop = "key"]
 */
export function getGender(query, opts = {}) {
  const { prop = 'key' } = opts;

  return filter(GENDERS, ({ [prop]: value }) => query === value)[0] || {};
}
