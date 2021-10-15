import Types from "../../data/types.json";
import TypeNames from "../../data/type_names.json";

describe("Type", () => {
  it("Should return correct data by ID", () => {
    const normal = Types.find((x) => x.id === 1);
    const normalName = TypeNames.find(
      (x) => x.id === normal.id && x.languageId === 9
    ).name;
    expect(normal).toBeDefined();
    expect(normal.damageClassId).toBe(2);
    expect(normal.generationId).toBe(1);
    expect(normal.id).toBe(1);
    expect(normal.identifier).toBe("normal");
    expect(normalName).toBe("Normal");
  });

  it("Should return correct data by Name", () => {
    const fireNameEntry = TypeNames.find((x) => x.name === "Fire");
    const fire = Types.find((x) => x.id === fireNameEntry.id);
    expect(fire).toBeDefined();
    expect(fire.damageClassId).toBe(3);
    expect(fire.generationId).toBe(1);
    expect(fire.id).toBe(10);
    expect(fire.identifier).toBe("fire");
    expect(fireNameEntry.name).toBe("Fire");
  });

  it("Should return correct data for Shadow", () => {
    const shadowNameEntry = TypeNames.find((x) => x.name === "Shadow");
    const shadow = Types.find((x) => x.id === shadowNameEntry.id);
    expect(shadow).toBeDefined();
    expect(shadow.damageClassId).toBe(0);
    expect(shadow.generationId).toBe(3);
    expect(shadow.id).toBe(10002);
    expect(shadow.identifier).toBe("shadow");
    expect(shadowNameEntry.name).toBe("Shadow");
  });
});
