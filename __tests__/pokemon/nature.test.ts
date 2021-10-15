import Natures from "../../data/natures.json";

describe("Nature", () => {
  it("Should return correct data by ID", () => {
    const hardy = Natures.find((x) => x.id === 1);
    expect(hardy).toBeDefined();
    expect(hardy.decreasedStatId).toBe(2);
    expect(hardy.gameIndex).toBe(0);
    expect(hardy.hatesFlavorId).toBe(1);
    expect(hardy.id).toBe(1);
    expect(hardy.identifier).toBe("hardy");
    expect(hardy.increasedStatId).toBe(2);
    expect(hardy.likesFlavorId).toBe(1);
    expect(hardy.name).toBe("Hardy");
  });

  it("Should return correct data by name", () => {
    const jolly = Natures.find((x) => x.name === "Jolly");
    expect(jolly).toBeDefined();
    expect(jolly.decreasedStatId).toBe(4);
    expect(jolly.gameIndex).toBe(13);
    expect(jolly.hatesFlavorId).toBe(2);
    expect(jolly.id).toBe(16);
    expect(jolly.identifier).toBe("jolly");
    expect(jolly.increasedStatId).toBe(6);
    expect(jolly.likesFlavorId).toBe(3);
    expect(jolly.name).toBe("Jolly");
  });
});
