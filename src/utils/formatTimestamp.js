import moment from 'moment';

export default function(timestamp, opts = {}) {
  const {
    format = 'YYYY-MM-DD HH:mm',
    default: defaultValue = '-'
  } = opts;

  return timestamp ? moment(timestamp).format(format) : defaultValue;
};
