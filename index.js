// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
/* jshint node: true */
'use strict';

const GitHubApi = require('github');
const DeployPluginBase = require('ember-cli-deploy-plugin');

const getEnvVar = require('./utils/get-env-var');
const buildPreviewURL = require('./utils/build-preview-url');
const getNormalizedRepoName = require('./utils/get-normalized-repo-name');

module.exports = {
  name: 'ember-cli-deploy-github',
  createDeployPlugin(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      requiredConfig: ['publicURL', 'token', 'userOrOrganization', 'repo', 'commitSha'],
      defaultConfig: {
        willActivate(context) {
          if (context.deployTarget === 'pull-request') {
            throw new Error('Aborting the deployment process. The `pull-request` deployment target should never be activated.');
          }
        },

        didDeploy(context) {
          let isCIEnvironment = getEnvVar('CI', this.readConfig('CI') || false);
          if (isCIEnvironment && context.deployTarget === 'pull-request') {
            return this.notifyPullRequestOfDeploy(context);
          }
        },

        notifyPullRequestOfDeploy(context) {
          let revisionKey = context.revisionData.revisionKey;
          let previewURLParams = {
            publicURL: this.readConfig('publicURL'),
            appPrefix: this.readConfig('appPrefix'),
          };

          let previewURL = buildPreviewURL(previewURLParams, revisionKey);

          let github = new GitHubApi({
            version: '3.0.0',
          });

          github.authenticate({
            type: 'oauth',
            token: this.readConfig('token'),
          });

          let githubRepo = this.readConfig('repo');
          githubRepo = getNormalizedRepoName(githubRepo);
          return new Promise((resolve, reject) => {
            github.statuses.create({
              user: this.readConfig('userOrOrganization'),
              repo: githubRepo,
              sha: this.readConfig('commitSha'),
              state: 'success',
              target_url: previewURL,
              context: 'ember-cli-deploy',
            }, (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            });
          });
        },
      },
    });

    return new DeployPlugin();
  },
};
