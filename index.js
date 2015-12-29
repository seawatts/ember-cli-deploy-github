// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
/* jshint node: true */
'use strict';

const GitHubApi = require('github');
const DeployPluginBase = require('ember-cli-deploy-plugin');

const getEnvVar = require('./utils/get-env-var');
const buildPreviewURL = require('./utils/build-preview-url');

module.exports = {
  name: 'ember-cli-deploy-github',
  createDeployPlugin(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      configure(context) {
        let isCIEnvironment = getEnvVar('CI', false);

        if (isCIEnvironment) {

          if (context.deployTarget === 'pull-request') {

            let githubRepo = getEnvVar('GITHUB_REPO_NAME', this.readConfig('repo'));
            githubRepo = getNormalizedRepoName(githubRepo);

            this.githubConfig = {
              token: getEnvVar('GITHUB_TOKEN', this.readConfig('token')),
              userOrOrganization: getEnvVar('GITHUB_USER_OR_ORGANIZATION', this.readConfig('userOrOrganization')),
              repo: githubRepo,
              sha: getEnvVar('GITHUB_COMMIT_SHA'),
              appPrefix: getEnvVar('APP_PREFIX', this.readConfig('appPrefix')),
              publicURL: getEnvVar('PUBLIC_URL', this.readConfig('publicURL')),
              publicURLVersionParam: getEnvVar('PUBLIC_URL_VERSION_PARAM', this.readConfig('publicURLVersionParam')),
            };
          }
        }
      },

      willActivate(context) {
        if (context.deployTarget === 'pull-request') {
          throw new Error('Aborting the deployment process. The `pull-request` deployment target should never be activated.');
        }
      },

      didDeploy(context) {
        let isCIEnvironment = getEnvVar('CI', false);
        if (isCIEnvironment) {
          if (context.deployTarget === 'pull-request') {
            return this.notifyPullRequestOfDeploy(context);
          }
        }
      },

      notifyPullRequestOfDeploy(context) {
        let githubConfig = this.githubConfig;
        let revisionKey = context.revisionData.revisionKey;
        let previewURL = buildPreviewURL(githubConfig, revisionKey);

        let github = new GitHubApi({
          version: '3.0.0',
        });

        github.authenticate({
          type: 'oauth',
          token: githubConfig.token,
        });

        return new Promise((resolve, reject) => {
          github.statuses.create({
            user: githubConfig.userOrOrganization,
            repo: githubConfig.repo,
            sha: githubConfig.sha,
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
    });

    return new DeployPlugin();
  },
};

// This can occur when passed in a github username/repo combo which is what some CI environments have by
// default
function getNormalizedRepoName(repoString) {
  if (repoString.indexOf('/') === -1) {
    return repoString;
  }

  return repoString.split('/')[1];
}
