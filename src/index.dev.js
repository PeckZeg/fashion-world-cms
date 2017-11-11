/*eslint no-unused-vars: "off" */

import React from 'react';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.css';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App.dev';


console.log('DEV');

render(<App />, document.getElementById('root'));
registerServiceWorker();
