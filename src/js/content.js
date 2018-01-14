/* eslint-disable no-unused-vars */

'use strict';

const elementReady = require('element-ready');

const content = require('../scss/content.scss');

elementReady('body').then(element => {
  console.info('<body> is ready, scrollbar loaded');
});
