# AWS Serverless Microservice common module

This module provides basic common functions and types for an AWS Serverless Microservice project including Cloudformation base template to deploy common AWS services like Cognito and EventBridge.

## Installing the package

To install this module into your project you can do:

With npm:

```
$ npm install @jmsoffredi/ms-common
```

With yarn:

```
$ yarn add @jmsoffredi/ms-common
```

## Building a new version of the module

In order to build a new version of the module you need to commit your changes to your desired branch as usual ensuring you increment your npm module version every time you intent to publish to the npm repository ([npm-version](https://docs.npmjs.com/cli/v7/commands/npm-version))

After pushing your changes to the repository, you have to create a Pull Request (PR) from your branch to main. After accepting the PR, GitHub will publish your new module version to the npm repository using a GitHub action.
