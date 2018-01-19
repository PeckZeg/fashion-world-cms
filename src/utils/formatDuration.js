import moment from 'moment';

import padStart from 'lodash/padStart';

export default function(duration, separator = ':') {
  if (!moment.isDuration(duration)) {
    duration = moment.duration(duration);
  }

  const hours = duration.hours();
  let d = [
    padStart(duration.minutes(), 2, '0'),
    padStart(duration.seconds(), 2, '0')
  ];

  if (hours) {
    d.unshift(padStart(hours, 2, '0'));
  }

  return d.join(separator);
};
