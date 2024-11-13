import { validLevel } from './valid-levels';

export async function run(inputs: {
  level: any;
  currentVersion: any;
}): Promise<void> {
  const { level, currentVersion } = inputs;

  validLevel(level);

  console.log({ currentVersion, level });
}
