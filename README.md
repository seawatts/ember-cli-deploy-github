# Ember-cli-deploy-github

> An ember-cli-deploy-plugin for setting the status on a commit in a PR on [GitHub](https://github.com/).

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
  userOrOrganization: `<user-name>`
  repo: `<my-ember-app-repo>`,
  appPrefix: '<dasherized-app-name> (optional)`
  publicURL: `<url-where-assets-will-be-viewed-from>`
  publicURLVersionParam: `<version-param-name>`
}
```

Ensure that the following environment variables are set:

- CI
- GITHUB_COMMIT_SHA

- Run the pipeline

```bash
$ ember deploy pull-request
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][2].

- `configure`
- `willActivate`
- `didDeploy`

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][2].

> All of these options can also be set through environment variables

### token 

The [token](https://github.com/settings/tokens) that will be used to set the status on the github commit.
 
- Environment variable: `GITHUB_TOKEN`

### userOrOrganization

The user or organization that owns the repo. e.x https://github.com/:userOrOrganization/my-repo
 
- Environment variable: `GITHUB_USER_OR_ORGANIZATION`

### repo

The user or organization that owns the repo. e.x https://github.com/my-user/:repo
 
- Environment variable: `GITHUB_REPO_NAME`

### GITHUB_COMMIT_SHA (Environment variable only)

The github commit sha that the status will be applied to. e.x https://github.com/my-user/:repo/commit/:sha

### appPrefix (optional)

This will be appended to the `publicURL`. e.x https://my-app-domain.com/:appPrefix

- Environment variable: `APP_PREFIX`

### publicURL

The url which your assets are going to be viewed from. e.x. https://my-app-domain.com

- Environment variable: `PUBLIC_URL`

### publicURLVersionParam

If you have your server setup to take a query param to view a specific version of the index file.
This will be the query param name that it will be applied to.
e.x https://my-app-domain.com/?:publicURLVersionParam=1.2.3

- Environment variable: `PUBLIC_URL_VERSION_PARAM`

## Note 

`ember-cli-deploy-github` will set the status of the github commit on the `didDeploy`. 

[2]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
