import * as core from '@actions/core';
// import * as github from '@actions/github';

async function run(): Promise<void> {
  try {
    const level = core.getInput('level');
    const currentVersion = core.getInput('current_version');

    console.log({ currentVersion, level });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
