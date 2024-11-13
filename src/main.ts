import * as semver from 'semver';

import { validLevel } from './valid-levels';
// import { runInWorkspace } from './run-in-workspace';

export async function run(inputs: {
  level: string;
  currentVersion: string;
}): Promise<[string, string]> {
  const { level, currentVersion } = inputs;

  validLevel(level);

  if (!semver.valid(currentVersion)) {
    throw new Error(`${currentVersion} is not a valid semver`);
  }

  const newVersion = semver.inc(currentVersion, level as any);

  console.log(process.env.GITHUB_WORKSPACE);

  // const args = ['version', newVersion, '--allow-same-version', '-m', message];
  // await runInWorkspace('npm', args, workspace);

  return [`v${newVersion}`, newVersion];
}
