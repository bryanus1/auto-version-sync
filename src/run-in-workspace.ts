import { spawn } from 'child_process';
import { EOL } from 'os';

export function runInWorkspace(
  command: string,
  args: string[],
  workspace: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('Executing command:', command, 'with arguments:', args);

    const child = spawn(command, args, { cwd: workspace });
    let errorMessages = '';

    child.stderr.on('data', (chunk) => (errorMessages += chunk.toString()));

    child.on('error', (error) =>
      reject(new Error(`Process error: ${error.message}`)),
    );

    child.on('exit', (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `${errorMessages}${EOL}${command} exited with code ${code}`,
          ),
        );
      } else {
        resolve();
      }
    });
  });
}
