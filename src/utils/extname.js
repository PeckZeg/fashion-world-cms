export default function(filename) {
  const match = /\.(\w+)$/.exec(filename);

  if (match) {
    return match[1];
  }

  return '';
};
