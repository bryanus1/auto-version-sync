import { getInput, setOutput, setFailed } from '@actions/core';
// import * as github from '@actions/github';

import { run as executeAction } from './main';

async function run() {
  try {
    const level = getInput('level');
    const currentVersion = getInput('current_version');
    const gitUsername = getInput('git_username');
    const gitEmail = getInput('git_email');

    const [newVersion, newVersionWithoutV] = await executeAction({
      level,
      currentVersion,
      gitEmail,
      gitUsername,
    });

    setOutput('new_version', newVersion);
    setOutput('new_version_without_v', newVersionWithoutV);
  } catch (error) {
    setFailed(error.message);
  }
}

run();
