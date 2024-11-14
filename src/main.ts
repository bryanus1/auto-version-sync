import * as semver from 'semver';

import { validLevel } from './valid-levels';
import { runInWorkspace } from './run-in-workspace';

export async function run(inputs: {
  level: string;
  currentVersion: string;
}): Promise<[string, string]> {
  const { level, currentVersion } = inputs;
  const workspace = process.env.GITHUB_WORKSPACE;

  validLevel(level);

  if (!semver.valid(currentVersion)) {
    throw new Error(`${currentVersion} is not a valid semver`);
  }

  const newVersion = semver.inc(currentVersion, level as any);

  await runInWorkspace(
    'git',
    ['config', 'user.name', 'github-actions[bot]'],
    workspace,
  );
  await runInWorkspace(
    'git',
    ['config', 'user.email', 'github-actions[bot]@users.noreply.github.com'],
    workspace,
  );

  const message = `ci: update version package.json to ${newVersion}`;
  const args = ['version', newVersion, '--allow-same-version', '-m', message];
  await runInWorkspace('npm', args, workspace);
  await runInWorkspace('git', ['push', '--follow-tags'], workspace);

  return [`v${newVersion}`, newVersion];
}