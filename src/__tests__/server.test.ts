describe("Mi primer Test", () => {
  it("debe revisar si 2 + 2 es 4", () => {
    expect(2 + 2).toBe(4);
  });
  it("debe revisar si 2 + 2 no sea 5", () => {
    expect(2 + 2).not.toBe(5);
  });
});
