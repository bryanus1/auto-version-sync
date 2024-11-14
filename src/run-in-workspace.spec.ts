import { EOL } from 'os';
import { spawn } from 'child_process';

import { runInWorkspace } from './run-in-workspace';

// Mock `spawn` to control its behavior in the test.
jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));

describe('runInWorkspace', () => {
  const mockCommand = 'echo';
  const mockArgs = ['Hello, world!'];
  const mockWorkspace = '/mock/workspace';
  let mockChildProcess: any;

  beforeEach(() => {
    // Reset mock implementations and data between tests.
    mockChildProcess = {
      stderr: {
        on: jest.fn(),
      },
      on: jest.fn(),
    };
    (spawn as jest.Mock).mockReturnValue(mockChildProcess);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should resolve if the command exits with code 0', async () => {
    // Simulate successful exit (code 0).
    mockChildProcess.on.mockImplementation((event, callback) => {
      if (event === 'exit') callback(0);
    });

    await expect(
      runInWorkspace(mockCommand, mockArgs, mockWorkspace),
    ).resolves.toBeUndefined();
    expect(spawn).toHaveBeenCalledWith(mockCommand, mockArgs, {
      cwd: mockWorkspace,
    });
  });

  it('should reject if the command exits with a non-zero code', async () => {
    const errorMessage = 'Test error message';
    // Simulate error output.
    mockChildProcess.stderr.on.mockImplementation((event, callback) => {
      if (event === 'data') callback(Buffer.from(errorMessage));
    });
    // Simulate non-zero exit code.
    mockChildProcess.on.mockImplementation((event, callback) => {
      if (event === 'exit') callback(1);
    });

    await expect(
      runInWorkspace(mockCommand, mockArgs, mockWorkspace),
    ).rejects.toThrow(`${errorMessage}${EOL}${mockCommand} exited with code 1`);
  });

  it('should reject if there is a spawn error', async () => {
    const error = new Error('Spawn error');
    // Simulate error in spawning the process.
    mockChildProcess.on.mockImplementation((event, callback) => {
      if (event === 'error') callback(error);
    });

    await expect(
      runInWorkspace(mockCommand, mockArgs, mockWorkspace),
    ).rejects.toThrow(`Process error: ${error.message}`);
  });
});
