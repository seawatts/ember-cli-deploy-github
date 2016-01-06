/* jshint node: true */
'use strict';

// This can occur when passed in a github username/repo combo which is what some CI environments have by
// default
module.exports = function(repoString) {
  if (repoString.indexOf('/') === -1) {
    return repoString;
  }

  return repoString.split('/')[1];
};
