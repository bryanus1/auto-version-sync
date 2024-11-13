import * as core from '@actions/core';
// import * as github from '@actions/github';

import { run as executeAction } from './main';

async function run() {
  try {
    const level = core.getInput('level');
    const currentVersion = core.getInput('current_version');

    const [newVersion, newVersionWithoutV] = await executeAction({
      level,
      currentVersion,
    });

    core.setOutput('new_version', newVersion);
    core.setOutput('new_version_without_v', newVersionWithoutV);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
