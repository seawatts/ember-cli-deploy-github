/* jshint node: true */
'use strict';
const urlencode = require('urlencode');

module.exports = function(params, version) {
  let publicURL = params.publicURL;
  let appPrefix = params.appPrefix;

  let previewURL = publicURL;

  if (appPrefix) {
    previewURL = `${previewURL}/${appPrefix}`;
  }

  if (version) {
    let urlEncodedVersion = urlencode(`:${version}`);

    if (previewURL.indexOf('{{versionSha}}') === -1) {
      throw new Error('{{versionSha}} must be present in the publicURL param');
    }

    previewURL = previewURL.replace('{{versionSha}}', `index.html${urlEncodedVersion}`);
  } else {
    previewURL = previewURL.replace('{{versionSha}}', '');
  }

  return previewURL;
};
