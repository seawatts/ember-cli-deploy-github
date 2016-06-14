# Ember-cli-deploy-github

> An ember-cli-deploy-plugin for setting the status on a commit in a PR on [GitHub](https://github.com/).

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-github.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-deploy-github.svg)](http://emberobserver.com/addons/ember-cli-deploy-github)
[![npm version](https://badge.fury.io/js/ember-cli-deploy-github.svg)](https://badge.fury.io/js/ember-cli-deploy-github)

### This repository is deprecated. Please use [ember-cli-deploy-github-status](https://github.com/seawatts/ember-cli-deploy-github-status) instead. 

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][2].

## Quick Start

To get up and running quickly, do the following:

- Install this plugin

```bash
$ ember install ember-cli-deploy-github
```

- Get a github api [token](https://github.com/settings/tokens) make sure the `repo:status` scope is selected

- Place the following configuration into `config/deploy.js`

```javascript
ENV.github = {
  token: '<your-github-token>',
  userOrOrganization: '<user-name>'
  repo: '<my-ember-app-repo>',
  publicURL: '<url-where-assets-will-be-viewed-from>',
  commitUser: '<who-made-the-commit',
  commitSha: '<sha-for-specific-commit>'
}
```

- Ensure that the following environment variables are set:
  - CI

- Run the pipeline

```bash
$ ember deploy pull-request
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][2].

- `configure`
- `willActivate`
- `didDeploy`

## Required Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][2].

### commitSha 

The github commit sha that the status will be applied to. e.x https://github.com/my-user/:repo/commit/:sha

### commitUser 

The github user that committed the code

### token 

The [token](https://github.com/settings/tokens) that will be used to set the status on the github commit.
 
### userOrOrganization

The user or organization that owns the repo. e.x https://github.com/:userOrOrganization/my-repo
 
### repo

The user or organization that owns the repo. e.x https://github.com/my-user/:repo
 
### publicURL

The url which your assets are going to be viewed from. e.x. https://my-app-domain.com
If you want to be able to a specific version of the index file you must include {{versionSha}} in the publicUrl
e.x https://my-app-domain.com/{{versionSha}}
This will get replaced and look like https://my-app-domain.com/index.html:123abf

## Optional Configuration Options

## Note 

`ember-cli-deploy-github` will set the status of the github commit on the `didDeploy`. 

[2]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
