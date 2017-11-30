import axios from 'axios';

export default url => axios({
  url: `${url}?imageInfo`,
  json: true
}).then(({ data }) => data);
