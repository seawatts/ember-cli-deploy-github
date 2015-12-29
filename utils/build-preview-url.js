/* jshint node: true */
'use strict';
const urlencode = require('urlencode');

module.exports = function(params, version) {
  let publicURL = params.publicURL;
  let appPrefix = params.appPrefix;
  let publicURLVersionParam = params.publicURLVersionParam;

  let previewURL = `${publicURL}/${appPrefix}`;

  if (version) {
    let urlEncodedVersion = urlencode(version);
    publicURLVersionParam = `?${publicURLVersionParam}=${urlEncodedVersion}`;
    previewURL += publicURLVersionParam;
  }

  return previewURL;
};
