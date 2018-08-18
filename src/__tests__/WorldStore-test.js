

test('Creates game grid', () => {
  const map = createMap();
  expect(Array.isArray(map)).toBe(true);
});