export interface IName {
  id: number;
  languageId: number;
  name: string;
}
export interface IPokemonSpeciesName extends IName {
  genus?: string;
}

export interface IPokemon {
  id: number;
  identifier: string;
  name: string;
  formName: string;
  speciesId: number;
  height: number;
  weight: number;
  baseExp: number;
  order: number;
  isDefault: boolean;
}

export interface IMove {
  id: number;
  identifier: string;
  name: string;
  generationId: number;
  romanGenerationId: string;
  typeId: number;
  power: number;
  pp: number;
  accuracy: number;
  priority: number;
  targetId: number;
  damageClassId: number;
  effectId: number;
  effectChance: number;
  contestTypeId: number;
  contestEffectId: number;
  superContestEffectId: number;
}

export interface IPokemonMove {
  id: number;
  moves: {
    versionGroupId: number;
    id: number;
    moveMethodId: number;
    requiredLevel: number;
    order: number;
  }[];
}

export interface IPokemonSpecies {
  id: number;
  identifier: string;
  generationId: number;
  romanGenerationId: string;
  evolvesFromSpeciesId: number;
  evolutionChainId: number;
  colorId: number;
  shapeId: number;
  habitatId: number;
  genderRate: number;
  captureRate: number;
  baseHappiness: number;
  isBaby: boolean;
  hatchCounter: number;
  hasGenderDifferences: boolean;
  growthRateId: number;
  formsSwitchable: boolean;
  order: number;
  conquestOrder: number;
}

export interface IPokemonType {
  id: number;
  types: number[];
}

export interface ITypeEfficacy {
  id: number;
  efficacies: { targetTypeId: number; damageFactor: number }[];
}

export interface IMoveMeta {
  id: number;
  metaCategoryId: number;
  metaAilmentId: number;
  minHits: number;
  maxHits: number;
  minTurns: number;
  maxTurns: number;
  drain: number;
  healing: number;
  criticalRate: number;
  ailmentChance: number;
  flinchChance: number;
  statChance: number;
}

export interface IType {
  id: number;
  identifier: string;
  generationId: number;
  romanGenerationId: string;
  damageClassId: number;
}

export interface IExperience {
  growthRateId: number;
  level: number;
  experience: number;
}

export interface IPokemonEvolution {
  id: number;
  evolvedSpeciesId: number;
  evolutionTriggerId: number;
  triggerItemId: number;
  minimumLevel: number;
  genderId: number;
  locationId: number;
  heldItemId: number;
  timeOfDay: string;
  knownMoveId: number;
  knownMoveTypeId: number;
  minimumHapiness: number;
  minimumBeauty: number;
  minimumAffection: number;
  relativePhysicalStats: number;
  partySpeciesId: number;
  partyTypeId: number;
  tradeSpeciesId: number;
  needsOverworldRain: boolean;
  turnUpsideDown: boolean;
}

export interface IStat {
  id: number;
  damageClassId: number;
  identifier: string;
  isBattleOnly: boolean;
  gameIndex: number;
}

export interface IPokemonStat {
  id: number;
  statId: number;
  baseStat: number;
  effort: number;
}

export interface IItem {
  id: number;
  identifier: string;
  name: string;
  categoryId: number;
  cost: number;
  flingPower: number;
  flingEffectId: number;
  gems?: boolean;
}

export interface INature {
  id: number;
  identifier: string;
  decreasedStatId: number;
  increasedStatId: number;
  hatesFlavorId: number;
  likesFlavorId: number;
  gameIndex: number;
}

export interface IMoveset {
  id: number;
  moves: number[];
}

export interface Stats {
  attack: number;
  defense: number;
  hp: number;
  "special-attack": number;
  "special-defense": number;
  speed: number;
}
export interface IMachine {
  tmId: number;
  versionGroupId: number;
  itemId: number;
  moveId: number;
}
