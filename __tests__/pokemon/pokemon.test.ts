import Move from "../../data/moves.json";
import MoveMeta from "../../data/move_meta.json";
import Pokemon from "../../data/pokemon.json";
import PokemonGrowthRateNames from "../../data/growth_rate_prose.json";
import PokemonHabitatNames from "../../data/pokemon_habitat_names.json";
import PokemonMoves from "../../data/pokemon_moves.json";
import PokemonSpecies from "../../data/pokemon_species.json";
import PokemonSpeciesNames from "../../data/pokemon_species_names.json";
import PokemonType from "../../data/pokemon_types.json";
import Type from "../../data/types.json";

interface IMoveMeta {
  statChance: number;
  minTurns: number;
  minHits: number;
  metaCategoryId: number;
  metaAilmentId: number;
  maxTurns: number;
  maxHits: number;
  id: number;
  healing: number;
  flinchChance: number;
  drain: number;
  criticalRate: number;
  ailmentChance: number;
}

interface IType {
  id: number;
  identifier: string;
  name: string;
  damageClassId: number;
  generationId: number;
}

interface IMove {
  name: string;
  accuracy: number;
  contestEffectId: number;
  damageClassId: number;
  effectChance: number;
  effectId: number;
  generationId: number;
  id: number;
  identifier: string;
  moveMethodId: number;
  order: number;
  power: number;
  pp: number;
  priority: number;
  requiredLevel: number;
  superContestEffectId: number;
  targetId: number;
  typeId: number;
  versionGroupId: number;
  meta: IMoveMeta;
  type: IType;
}

interface IName {
  id: number;
  languageId: number;
  name: string;
}

interface IPokemonSpecies {
  genus: string;
  baseHappiness: number;
  captureRate: number;
  colorId: number;
  evolutionChainId: number;
  evolvesFromSpeciesId: number;
  formsSwitchable: boolean;
  genderRate: number;
  generationId: number;
  growthRateId: number;
  habitatId: number;
  hasGenderDifferences: boolean;
  hatchCounter: number;
  identifier: string;
  isBaby: boolean;
  name: string;
  order: number;
  shapeId: number;
  growthRate: IName;
  habitat: IName;
}

interface IPokemon {
  baseExp: number;
  colorCode: number;
  formName: string | null;
  height: number;
  id: number;
  identifier: string;
  isDefault: boolean;
  name: string;
  order: number;
  speciesId: number;
  weight: number;
  species: IPokemonSpecies;
  nextEvolutions: number[];
  moves: IMove[];
  types: IType[];
}

interface IPokemonMove {
  id: number;
  moves: {
    versionGroupId: number;
    id: number;
    requiredLevel: number;
    moveMethodId: number;
    order: number;
  }[];
}

const COLORS = {
  BLACK: 0x000000,
  BLUE: 0x6890f0,
  BROWN: 0x927d44,
  GRAY: 0x95a5a6,
  GREEN: 0x78c850,
  PINK: 0xee99ac,
  PURPLE: 0xa040a0,
  RED: 0xe74c3c,
  WHITE: 0xffffff,
  YELLOW: 0xffff00,
};

const getPokemonById = (id: number): IPokemon => {
  const pokemon = Pokemon.find((x) => x.id === id);
  const species = PokemonSpecies.find((x) => x.id === pokemon.speciesId);
  const speciesName = PokemonSpeciesNames.find(
    (x) => x.id === species.id && x.languageId === 9
  );
  const growthRate = PokemonGrowthRateNames.find(
    (x) => x.id === species.growthRateId && x.languageId === 9
  );
  const habitat = PokemonHabitatNames.find(
    (x) => x.id === species.habitatId && x.languageId === 9
  );

  return {
    ...pokemon,
    species: {
      ...species,
      genus: speciesName.genus,
      name: speciesName.name,
      growthRate,
      habitat,
    },
    colorCode: Object.values(COLORS)[species.colorId - 1],
    formName: null, // TODO: fix
    nextEvolutions: PokemonSpecies.filter(
      (x) => x.evolvesFromSpeciesId === pokemon.id
    ).map((x) => x.id),
    moves: (PokemonMoves as IPokemonMove[])
      .find((x) => x.id === pokemon.id)
      .moves.map((x) => {
        const move = Move.find((y) => y.id === x.id);
        return {
          ...x,
          ...move,
          type: Type.find((x) => x.id === move.typeId),
          meta: MoveMeta.find((x) => x.id === move.id),
        };
      }),
    types: PokemonType.find((x) => x.id === pokemon.id).types.map((x) =>
      Type.find((y) => y.id === x)
    ),
  };
};

describe("Pokémon", () => {
  it("Should return correct data by ID for Bulbasaur", () => {
    const bulbasaur = getPokemonById(1);
    // Basic data test
    expect(bulbasaur).toBeDefined();
    expect(bulbasaur.baseExp).toBe(64);
    expect(bulbasaur.colorCode).toBe(7915600);
    expect(bulbasaur.formName).toBeNull();
    expect(bulbasaur.height).toBe(7);
    expect(bulbasaur.id).toBe(1);
    expect(bulbasaur.identifier).toBe("bulbasaur");
    expect(bulbasaur.isDefault).toBe(true);
    expect(bulbasaur.name).toBe("Bulbasaur");
    expect(bulbasaur.order).toBe(1);
    expect(bulbasaur.speciesId).toBe(1);
    expect(bulbasaur.weight).toBe(69);

    // Evolutions Data Test
    expect(bulbasaur.nextEvolutions).toBeDefined();
    expect(bulbasaur.nextEvolutions.length).toBe(1);
    expect(bulbasaur.nextEvolutions[0]).toBe(2);

    // Moves data test
    // Basic moves data test
    expect(bulbasaur.moves).toBeDefined();
    expect(bulbasaur.moves.length).toBe(84);
    const razorLeaf = bulbasaur.moves.find((x) => x.name === "Razor Leaf");
    expect(razorLeaf).toBeDefined();
    expect(razorLeaf.accuracy).toBe(95);
    expect(razorLeaf.contestEffectId).toBe(2);
    expect(razorLeaf.damageClassId).toBe(2);
    expect(razorLeaf.effectChance).toBe(0);
    expect(razorLeaf.effectId).toBe(44);
    expect(razorLeaf.generationId).toBe(1);
    expect(razorLeaf.id).toBe(75);
    expect(razorLeaf.identifier).toBe("razor-leaf");
    expect(razorLeaf.moveMethodId).toBe(1);
    expect(razorLeaf.name).toBe("Razor Leaf");
    expect(razorLeaf.order).toBe(0);
    expect(razorLeaf.power).toBe(55);
    expect(razorLeaf.pp).toBe(25);
    expect(razorLeaf.priority).toBe(0);
    expect(razorLeaf.requiredLevel).toBe(19);
    expect(razorLeaf.superContestEffectId).toBe(5);
    expect(razorLeaf.targetId).toBe(11);
    expect(razorLeaf.typeId).toBe(12);
    expect(razorLeaf.versionGroupId).toBe(18);

    // Move meta data test
    expect(razorLeaf.meta.ailmentChance).toBe(0);
    expect(razorLeaf.meta.criticalRate).toBe(1);
    expect(razorLeaf.meta.drain).toBe(0);
    expect(razorLeaf.meta.flinchChance).toBe(0);
    expect(razorLeaf.meta.healing).toBe(0);
    expect(razorLeaf.meta.id).toBe(75);
    expect(razorLeaf.meta.maxHits).toBe(0);
    expect(razorLeaf.meta.maxTurns).toBe(0);
    expect(razorLeaf.meta.metaAilmentId).toBe(0);
    expect(razorLeaf.meta.metaCategoryId).toBe(0);
    expect(razorLeaf.meta.minHits).toBe(0);
    expect(razorLeaf.meta.minTurns).toBe(0);
    expect(razorLeaf.meta.statChance).toBe(0);

    // Move type data test
    expect(razorLeaf.type).toBeDefined();
    expect(razorLeaf.type.damageClassId).toBe(3);
    expect(razorLeaf.type.generationId).toBe(1);
    expect(razorLeaf.type.id).toBe(12);
    expect(razorLeaf.type.identifier).toBe("grass");
    expect(razorLeaf.type.name).toBe("Grass");

    // Types data test
    expect(bulbasaur.types).toBeDefined();
    expect(bulbasaur.types.length).toBe(2);

    // Type 1 test
    expect(bulbasaur.types[0]).toBeDefined();
    expect(bulbasaur.types[0].id).toBe(12);
    expect(bulbasaur.types[0].identifier).toBe("grass");
    expect(bulbasaur.types[0].generationId).toBe(1);
    expect(bulbasaur.types[0].damageClassId).toBe(3);
    expect(bulbasaur.types[0].name).toBe("Grass");

    // Type 2 test
    expect(bulbasaur.types[1]).toBeDefined();
    expect(bulbasaur.types[1].id).toBe(4);
    expect(bulbasaur.types[1].identifier).toBe("poison");
    expect(bulbasaur.types[1].generationId).toBe(1);
    expect(bulbasaur.types[1].damageClassId).toBe(2);
    expect(bulbasaur.types[1].name).toBe("Poison");

    // Species data test
    // Basic species data test
    expect(bulbasaur.species).toBeDefined();
    expect(bulbasaur.species.genus).toBe("Seed Pokémon");
    expect(bulbasaur.species.baseHappiness).toBe(70);
    expect(bulbasaur.species.captureRate).toBe(45);
    expect(bulbasaur.species.colorId).toBe(5);
    expect(bulbasaur.species.evolutionChainId).toBe(1);
    expect(bulbasaur.species.evolvesFromSpeciesId).toBe(0);
    expect(bulbasaur.species.formsSwitchable).toBe(false);
    expect(bulbasaur.species.genderRate).toBe(1);
    expect(bulbasaur.species.generationId).toBe(1);
    expect(bulbasaur.species.growthRateId).toBe(4);
    expect(bulbasaur.species.habitatId).toBe(3);
    expect(bulbasaur.species.hasGenderDifferences).toBe(false);
    expect(bulbasaur.species.hatchCounter).toBe(20);
    expect(bulbasaur.species.identifier).toBe("bulbasaur");
    expect(bulbasaur.species.isBaby).toBe(false);
    expect(bulbasaur.species.name).toBe("Bulbasaur");
    expect(bulbasaur.species.order).toBe(1);
    expect(bulbasaur.species.shapeId).toBe(8);

    // Species growth rate test
    expect(bulbasaur.species.growthRate).toBeDefined();
    expect(bulbasaur.species.growthRate.id).toBe(4);
    expect(bulbasaur.species.growthRate.languageId).toBe(9);
    expect(bulbasaur.species.growthRate.name).toBe("medium slow");

    // Species habitat test
    expect(bulbasaur.species.habitat).toBeDefined();
    expect(bulbasaur.species.habitat.id).toBe(3);
    expect(bulbasaur.species.habitat.languageId).toBe(9);
    expect(bulbasaur.species.habitat.name).toBe("Grassland");
  });

  it("Should return correct data by ID for Zeraora", () => {
    const zeraora = getPokemonById(807);

    // Basic data test
    expect(zeraora).toBeDefined();
    expect(zeraora.baseExp).toBe(270);
    expect(zeraora.colorCode).toBe(16776960);
    expect(zeraora.formName).toBeNull();
    expect(zeraora.height).toBe(15);
    expect(zeraora.id).toBe(807);
    expect(zeraora.identifier).toBe("zeraora");
    expect(zeraora.isDefault).toBe(true);
    expect(zeraora.name).toBe("Zeraora");
    expect(zeraora.order).toBe(964);
    expect(zeraora.speciesId).toBe(807);
    expect(zeraora.weight).toBe(445);

    // Evolutions Data Test
    expect(zeraora.nextEvolutions).toBeDefined();
    expect(zeraora.nextEvolutions.length).toBe(0);

    // Moves data test
    // Basic moves data test
    expect(zeraora.moves).toBeDefined();
    expect(zeraora.moves.length).toBe(49);
    const plasmaFists = zeraora.moves.find((x) => x.name === "Plasma Fists");
    expect(plasmaFists).toBeDefined();
    expect(plasmaFists.accuracy).toBe(100);
    expect(plasmaFists.contestEffectId).toBe(0);
    expect(plasmaFists.damageClassId).toBe(2);
    expect(plasmaFists.effectChance).toBe(0);
    expect(plasmaFists.effectId).toBe(1);
    expect(plasmaFists.generationId).toBe(7);
    expect(plasmaFists.id).toBe(721);
    expect(plasmaFists.identifier).toBe("plasma-fists");
    expect(plasmaFists.moveMethodId).toBe(1);
    expect(plasmaFists.name).toBe("Plasma Fists");
    expect(plasmaFists.order).toBe(0);
    expect(plasmaFists.power).toBe(100);
    expect(plasmaFists.pp).toBe(15);
    expect(plasmaFists.priority).toBe(0);
    expect(plasmaFists.requiredLevel).toBe(43);
    expect(plasmaFists.superContestEffectId).toBe(0);
    expect(plasmaFists.targetId).toBe(10);
    expect(plasmaFists.typeId).toBe(13);
    expect(plasmaFists.versionGroupId).toBe(18);

    // Move meta data test
    expect(plasmaFists.meta.ailmentChance).toBe(0);
    expect(plasmaFists.meta.criticalRate).toBe(0);
    expect(plasmaFists.meta.drain).toBe(0);
    expect(plasmaFists.meta.flinchChance).toBe(0);
    expect(plasmaFists.meta.healing).toBe(0);
    expect(plasmaFists.meta.id).toBe(721);
    expect(plasmaFists.meta.maxHits).toBe(0);
    expect(plasmaFists.meta.maxTurns).toBe(0);
    expect(plasmaFists.meta.metaAilmentId).toBe(0);
    expect(plasmaFists.meta.metaCategoryId).toBe(0);
    expect(plasmaFists.meta.minHits).toBe(0);
    expect(plasmaFists.meta.minTurns).toBe(0);
    expect(plasmaFists.meta.statChance).toBe(0);

    // Move type data test
    expect(plasmaFists.type).toBeDefined();
    expect(plasmaFists.type.damageClassId).toBe(3);
    expect(plasmaFists.type.generationId).toBe(1);
    expect(plasmaFists.type.id).toBe(13);
    expect(plasmaFists.type.identifier).toBe("electric");
    expect(plasmaFists.type.name).toBe("Electric");

    // Types data test
    expect(zeraora.types).toBeDefined();
    expect(zeraora.types.length).toBe(1);

    // Type 1 test
    expect(zeraora.types[0]).toBeDefined();
    expect(zeraora.types[0].id).toBe(13);
    expect(zeraora.types[0].identifier).toBe("electric");
    expect(zeraora.types[0].generationId).toBe(1);
    expect(zeraora.types[0].damageClassId).toBe(3);
    expect(zeraora.types[0].name).toBe("Electric");

    // Species data test
    // Basic species data test
    expect(zeraora.species).toBeDefined();
    expect(zeraora.species.genus).toBe("Thunderclap Pokémon");
    expect(zeraora.species.baseHappiness).toBe(0);
    expect(zeraora.species.captureRate).toBe(3);
    expect(zeraora.species.colorId).toBe(10);
    expect(zeraora.species.evolutionChainId).toBe(427);
    expect(zeraora.species.evolvesFromSpeciesId).toBe(0);
    expect(zeraora.species.formsSwitchable).toBe(false);
    expect(zeraora.species.genderRate).toBe(-1);
    expect(zeraora.species.generationId).toBe(7);
    expect(zeraora.species.growthRateId).toBe(1);
    expect(zeraora.species.habitatId).toBe(0);
    expect(zeraora.species.hasGenderDifferences).toBe(false);
    expect(zeraora.species.hatchCounter).toBe(120);
    expect(zeraora.species.identifier).toBe("zeraora");
    expect(zeraora.species.isBaby).toBe(false);
    expect(zeraora.species.name).toBe("Zeraora");
    expect(zeraora.species.order).toBe(807);
    expect(zeraora.species.shapeId).toBe(12);

    // Species growth rate test
    expect(zeraora.species.growthRate).toBeDefined();
    expect(zeraora.species.growthRate.id).toBe(1);
    expect(zeraora.species.growthRate.languageId).toBe(9);
    expect(zeraora.species.growthRate.name).toBe("slow");

    // Species habitat test
    expect(zeraora.species.habitat).toBeUndefined();
  });
});
