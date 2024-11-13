import * as core from '@actions/core';
// import * as github from '@actions/github';

import { run } from './main';

try {
  const level = core.getInput('level');
  const currentVersion = core.getInput('current_version');

  run({
    level,
    currentVersion,
  });
} catch (error) {
  core.setFailed(error.message);
}
