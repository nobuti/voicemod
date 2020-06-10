import getCategories from "../categories";

describe("utils/categories", () => {
  test("should return categories properly", () => {
    const voices = [
      { tags: ["manzana"] },
      { tags: ["cebolleta"] },
      { tags: ["wadus", "bogus"] },
    ];
    const categories = getCategories(voices);

    expect(categories).toHaveLength(5);
    expect(categories.map((c) => c.value)).toEqual([
      "all",
      "manzana",
      "cebolleta",
      "wadus",
      "bogus",
    ]);
    categories.forEach((c) => {
      expect(c.label).toBeDefined();
      expect(c.value).toBeDefined();
    });
  });

  test("should work with voices having no tags", () => {
    const voices = [
      { tags: ["manzana"] },
      { id: "wadus" },
      { tags: ["wadus", "bogus"] },
    ];
    const categories = getCategories(voices);

    expect(categories).toHaveLength(4);
    expect(categories.map((c) => c.value)).toEqual([
      "all",
      "manzana",
      "wadus",
      "bogus",
    ]);
  });
});
