export const LEVELS_VALID = ['major', 'minor', 'patch'];
export function validLevel(level: any): void {
  if (!LEVELS_VALID.includes(level)) {
    throw Error(
      `${level} is invalid, levels valid are ${LEVELS_VALID.join(', ')}`,
    );
  }
}
