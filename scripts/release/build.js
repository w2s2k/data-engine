#!/usr/bin/env node

const { exec, } = require('child_process');

// Follows the steps outlined in github.com/facebook/react/issues/10620
const run = async () => {
    const chalk = require('chalk');
    const logUpdate = require('log-update');
    const { getPublicPackages, } = require('./utils');

    const addGitTag = require('./build-commands/add-git-tag');
    const buildArtifacts = require('./build-commands/build-artifacts');
    const checkNpmPermissions = require('./build-commands/check-npm-permissions');
    const checkPackageDependencies = require('./build-commands/check-package-dependencies');
    const checkUncommittedChanges = require('./build-commands/check-uncommitted-changes');
    const installYarnDependencies = require('./build-commands/install-yarn-dependencies');
    const parseBuildParameters = require('./build-commands/parse-build-parameters');
    const updateGit = require('./build-commands/update-git');
    const updatePackageVersions = require('./build-commands/update-package-versions');
    const updateYarnDependencies = require('./build-commands/update-yarn-dependencies');
    const validateVersion = require('./build-commands/validate-version');

    try {
        const params = parseBuildParameters();
        params.packages = getPublicPackages();

        await validateVersion(params);
        await checkUncommittedChanges(params);
        await checkNpmPermissions(params);
        await updateGit(params);
        await installYarnDependencies(params);
        await checkPackageDependencies(params);
        await updateYarnDependencies(params);
        await updatePackageVersions(params);
        await buildArtifacts(params);
        await addGitTag(params);
    } catch (error) {
        logUpdate.clear();

        const message = error.message.trim().replace(/\n +/g, '\n');
        const stack = error.stack.replace(error.message, '');

        console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(message)}\n\n${chalk.gray(stack)}`);

        process.exit(1);
    }
};

// Install (or update) release script dependencies before proceeding.
// This needs to be done before we require() the first NPM module.
exec('yarn install', { cwd: __dirname, }, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        run();
    }
});
