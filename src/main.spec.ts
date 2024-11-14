import { run } from './main';
import { runInWorkspace } from './run-in-workspace';

jest.mock('semver', () => ({
  inc: jest.fn().mockReturnValue('1.0.0'),
  valid: jest.fn().mockImplementation((_semver) => {
    return _semver !== '';
  }),
}));

jest.mock('./run-in-workspace', () => ({
  runInWorkspace: jest.fn(),
}));

describe('run', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return version with and without "V"', async () => {
    const inputs = { level: 'major', currentVersion: '0.1.0' };

    const [newVersion, newVersionWithoutV] = await run(inputs);

    expect(newVersion).toEqual('v1.0.0');
    expect(newVersionWithoutV).toEqual('1.0.0');

    expect(runInWorkspace).toHaveBeenCalledTimes(4);
  });

  it('should throw error if `level` is invalid', async () => {
    const inputs = { level: 'invalid', currentVersion: '1.0.0' };
    await expect(run(inputs)).rejects.toThrow();
  });

  it('should throw error if `currentVersion` is invalid', async () => {
    const inputs = { level: 'patch', currentVersion: '' };
    await expect(run(inputs)).rejects.toThrow();
  });
});