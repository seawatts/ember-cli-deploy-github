/* jshint node: true */
'use strict';
const urlencode = require('urlencode');

module.exports = function(publicURL, version) {
  let previewURL = publicURL;

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
