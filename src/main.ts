import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run(): Promise<void> {
  const LEVELS = ['major', 'minor', 'patch'];
  try {
    const level = core.getInput('level');
    const currentVersion = core.getInput('current_version');

    if (!LEVELS.includes(level)) {
      throw Error(`${level} is invalid, levels valid are ${LEVELS.join(', ')}`);
    }

    console.log({ currentVersion, level }, github.context);
  } catch (error) {
    core.setFailed(error.message);
  }
}
