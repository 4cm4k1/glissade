/* eslint-disable no-unused-vars */

'use strict';

import elementReady from 'element-ready';

import content from '../scss/content.scss';

elementReady('body').then(element => {
  console.info('<body> is ready, scrollbar loaded');
});
