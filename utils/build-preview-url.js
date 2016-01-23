/* jshint node: true */
'use strict';

module.exports = function(params, version) {
  let publicURL = params.publicURL;
  let appPrefix = params.appPrefix;

  let previewURL = `${publicURL}/${appPrefix}`;

  if (version) {
    if (previewURL.indexOf('{{versionSha}}') === -1) {
      throw new Error('{{versionSha}} must be present in the publicURL param');
    }

    previewURL.replace('{{versionSha}}', version);
  }

  return previewURL;
};
