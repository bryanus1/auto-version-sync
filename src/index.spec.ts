function add(a: number, b: number): number {
  return a + b;
}

describe('Index', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
