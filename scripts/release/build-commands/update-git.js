#!/usr/bin/env node


const chalk = require('chalk');
const { exec, } = require('child-process-promise');
const { logPromise, } = require('../utils');

const update = async ({ cwd, }) => {
    await exec('git fetch', { cwd, });
    await exec('git checkout master', { cwd, });
    await exec('git pull', { cwd, });
};

module.exports = async ({ cwd, }) => logPromise(
    update({ cwd, }),
    `Updating checkout ${chalk.yellow.bold(cwd)}`
);
