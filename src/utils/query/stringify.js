import { stringify } from 'querystring';

export default query => `?${stringify(query)}`;
