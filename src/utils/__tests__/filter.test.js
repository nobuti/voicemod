import { sort, filter, search } from "../filter";

describe("utils/filter", () => {
  const voices = [
    { name: "zerous", tags: ["one"] },
    { name: "cebolleta", tags: ["two"] },
    { name: "wadus", tags: ["one", "two"] },
    { name: "1x2", tags: ["three"] },
  ];

  test("should sort properly", () => {
    let sorted = sort({ voices, direction: "desc" });

    expect(sorted).toEqual([
      { name: "zerous", tags: ["one"] },
      { name: "wadus", tags: ["one", "two"] },
      { name: "cebolleta", tags: ["two"] },
      { name: "1x2", tags: ["three"] },
    ]);

    sorted = sort({ voices, direction: "asc" });

    expect(sorted).toEqual([
      { name: "1x2", tags: ["three"] },
      { name: "cebolleta", tags: ["two"] },
      { name: "wadus", tags: ["one", "two"] },
      { name: "zerous", tags: ["one"] },
    ]);
  });

  test("should filter properly", () => {
    let filtered = filter({ voices, categorie: "one" });
    expect(filtered).toEqual(
      expect.arrayContaining([
        { name: "zerous", tags: ["one"] },
        { name: "wadus", tags: ["one", "two"] },
      ])
    );

    filtered = filter({ voices, categorie: "three" });
    expect(filtered).toEqual([{ name: "1x2", tags: ["three"] }]);

    filtered = filter({ voices, categorie: "wadus" });
    expect(filtered).toEqual([]);
  });

  test("should search properly", () => {
    let filtered = search({ voices, query: "er" });
    expect(filtered).toEqual([{ name: "zerous", tags: ["one"] }]);

    filtered = search({ voices, query: "us" });
    expect(filtered).toEqual(
      expect.arrayContaining([
        { name: "zerous", tags: ["one"] },
        { name: "wadus", tags: ["one", "two"] },
      ])
    );

    filtered = search({ voices, query: "foo" });
    expect(filtered).toEqual([]);
  });
});
