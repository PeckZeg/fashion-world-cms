import uniqueId from 'lodash/uniqueId';
import has from 'lodash/has';

export default class UniqKey {
  constructor() {
    this.keys = {};
  }

  key(name, prefix = 'key') {
    if (!has(this.keys, name)) {
      this.keys[name] = uniqueId(prefix);
    }

    return this.keys[name];
  }

  keys() {
    return this.keys;
  }
}
