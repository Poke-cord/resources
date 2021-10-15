import Stats from "../../data/stats.json";
import StatNames from "../../data/stat_names.json";

describe("Stats", () => {
  it("Should return correct data by ID", () => {
    const hp = Stats.find((x) => x.id === 1);
    const hpName = StatNames.find(
      (x) => x.id === hp.id && x.languageId === 9
    ).name;
    expect(hp).toBeDefined();
    expect(hp.damageClassId).toBe(0);
    expect(hp.gameIndex).toBe(1);
    expect(hp.id).toBe(1);
    expect(hp.identifier).toBe("hp");
    expect(hp.isBattleOnly).toBe(false);
    expect(hpName).toBe("HP");
  });

  it("Should return correct data by Name", () => {
    const speedNameEntry = StatNames.find((x) => x.name === "Speed");
    const speed = Stats.find((x) => x.id === speedNameEntry.id);
    expect(speed).toBeDefined();
    expect(speed.damageClassId).toBe(0);
    expect(speed.gameIndex).toBe(4);
    expect(speed.id).toBe(6);
    expect(speed.identifier).toBe("speed");
    expect(speed.isBattleOnly).toBe(false);
    expect(speedNameEntry.name).toBe("Speed");
  });
});
