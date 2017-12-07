import moment from 'moment';

export default function(timestamp, opts = {}) {
  const {
    format = 'YYYY-MM-DD HH:mm',
    default: defaultValue = '-'
  } = opts;
  const date = moment(timestamp);
  let value = defaultValue;

  if (date.isValid()) {
    value = date.format(format);

    if (opts.fromNow) {
      value += `（${date.fromNow()}）`;
    }
  }

  return value;
};
