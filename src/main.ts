import * as semver from 'semver';

import { validLevel } from './valid-levels';

export async function run(inputs: {
  level: any;
  currentVersion: any;
}): Promise<void> {
  const { level, currentVersion } = inputs;

  validLevel(level);

  if (!semver.valid(currentVersion)) {
    throw new Error(`${currentVersion} is not a valid semver`);
  }

  console.log({ currentVersion, level });
}
