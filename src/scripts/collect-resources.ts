import groupBy from "lodash.groupby";
import csv2json from "csvtojson";
import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";
import yargs from "yargs";

import {
  addAfterField,
  identifierToName,
  toTitleCase,
  romanize,
} from "../util";
import {
  POKEMON_FORMS_REGEX,
  STAT_NAMES_CSV_PATH,
  STAT_NAMES_JSON_PATH,
  GROWTH_RATES_CSV_PATH,
  GROWTH_RATES_JSON_PATH,
  TYPE_NAMES_CSV_PATH,
  TYPE_NAMES_JSON_PATH,
  NATURE_NAMES_CSV_PATH,
  NATURE_NAMES_JSON_PATH,
  POKEMON_HABITAT_NAMES_CSV_PATH,
  POKEMON_HABITAT_NAMES_JSON_PATH,
  POKEMON_CSV_PATH,
  POKEMON_JSON_PATH,
  MOVES_CSV_PATH,
  MOVES_JSON_PATH,
  MOVE_META_CSV_PATH,
  MOVE_META_JSON_PATH,
  MOVESETS_JSON_PATH,
  POKEMON_MOVES_JSON_PATH,
  POKEMON_MOVES_CSV_PATH,
  POKEMON_SPECIES_CSV_PATH,
  POKEMON_SPECIES_JSON_PATH,
  POKEMON_TYPES_CSV_PATH,
  POKEMON_TYPES_JSON_PATH,
  TYPES_CSV_PATH,
  TYPES_JSON_PATH,
  EXPERIENCE_CSV_PATH,
  EXPERIENCE_JSON_PATH,
  POKEMON_EVOLUTION_CSV_PATH,
  POKEMON_EVOLUTION_JSON_PATH,
  STATS_CSV_PATH,
  STATS_JSON_PATH,
  POKEMON_STATS_CSV_PATH,
  POKEMON_STATS_JSON_PATH,
  ITEMS_CSV_PATH,
  ITEMS_JSON_PATH,
  NATURES_CSV_PATH,
  NATURES_JSON_PATH,
  DATA_PATH,
  POKEMON_SPECIES_NAMES_CSV_PATH,
  POKEMON_SPECIES_NAMES_JSON_PATH,
  TYPE_EFFICACY_CSV_PATH,
  TYPE_EFFICACY_JSON_PATH,
} from "../util/constants";
import {
  IName,
  IPokemon,
  IMove,
  IPokemonMove,
  IPokemonSpecies,
  IPokemonType,
  IType,
  IExperience,
  IPokemonEvolution,
  IStat,
  IPokemonStat,
  IItem,
  INature,
  ITypeEfficacy,
} from "../util/structures";

dotenv.config();

const BRANCH_OR_COMMIT_ID = "5e803da514ade0d3770a8fef2ee093250f8dfc20";

// Various Names Collector
export const collectStatNames = async (force: boolean) => {
  if (!fs.existsSync(STAT_NAMES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/stat_names.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(STAT_NAMES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IName[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "languageId", "name"],
  })
    .fromFile(STAT_NAMES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "languageId"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(STAT_NAMES_JSON_PATH, JSON.stringify(json, null));
};

export const collectGrowthRateNames = async (force: boolean) => {
  if (!fs.existsSync(GROWTH_RATES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/growth_rate_prose.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(GROWTH_RATES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IName[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "languageId", "name"],
  })
    .fromFile(GROWTH_RATES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "languageId"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(GROWTH_RATES_JSON_PATH, JSON.stringify(json, null));
};

export const collectTypeNames = async (force: boolean) => {
  if (!fs.existsSync(TYPE_NAMES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/type_names.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(TYPE_NAMES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IName[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "languageId", "name"],
  })
    .fromFile(TYPE_NAMES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "languageId"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(TYPE_NAMES_JSON_PATH, JSON.stringify(json, null));
};

export const collectNatureNames = async (force: boolean) => {
  if (!fs.existsSync(NATURE_NAMES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/nature_names.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(NATURE_NAMES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IName[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "languageId", "name"],
  })
    .fromFile(NATURE_NAMES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "languageId"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(NATURE_NAMES_JSON_PATH, JSON.stringify(json, null));
};

export const collectHabitatNames = async (force: boolean) => {
  if (!fs.existsSync(POKEMON_HABITAT_NAMES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon_habitat_names.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(POKEMON_HABITAT_NAMES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IName[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "languageId", "name"],
  })
    .fromFile(POKEMON_HABITAT_NAMES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "languageId"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      parsedObj.name = toTitleCase(parsedObj.name);
      json.push(parsedObj);
    });
  fs.writeFileSync(POKEMON_HABITAT_NAMES_JSON_PATH, JSON.stringify(json, null));
};

export const collectPokemonSpeciesNames = async (force: boolean) => {
  if (!fs.existsSync(POKEMON_SPECIES_NAMES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon_species_names.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(POKEMON_SPECIES_NAMES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IName[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "languageId", "name", "genus"],
  })
    .fromFile(POKEMON_SPECIES_NAMES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "languageId"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(POKEMON_SPECIES_NAMES_JSON_PATH, JSON.stringify(json, null));
};

export const collectPokemon = async (force: boolean) => {
  if (!fs.existsSync(POKEMON_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(POKEMON_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IPokemon[] = [];
  await csv2json({
    noheader: false,
    headers: [
      "id",
      "identifier",
      "speciesId",
      "height",
      "weight",
      "baseExp",
      "order",
      "isDefault",
    ],
  })
    .fromFile(POKEMON_CSV_PATH)
    .subscribe((parsedObj) => {
      // prevents pokemon that has id 10k+ or huge numbers from being added
      // if isDefault is 0, they should not be added
      // don't replace == with ===, using loose check here because isDefault may be a number or a string
      if (parsedObj.isDefault && parsedObj.isDefault != "0") {
        parsedObj.isDefault = parsedObj.isDefault === "1";
        ["id", "speciesId", "height", "weight", "baseExp", "order"].forEach(
          (key) => {
            parsedObj[key] = parseInt(parsedObj[key]);
          }
        );
        const formattedObj = addAfterField(
          parsedObj,
          "identifier",
          "name",
          toTitleCase(identifierToName(parsedObj.identifier))
        );
        if (POKEMON_FORMS_REGEX.test(formattedObj.identifier)) {
          formattedObj.formName = formattedObj.name
            .split(" ")
            .reverse()
            .slice(0, 1)
            .join(" ");
          formattedObj.name = formattedObj.name.split(" ")[0];
        } else {
          formattedObj.formName = null;
        }
        json.push(formattedObj);
      }
    });
  fs.writeFileSync(POKEMON_JSON_PATH, JSON.stringify(json, null));
};

export const collectMoves = async (force: boolean) => {
  if (!fs.existsSync(MOVES_CSV_PATH) || force) {
    if (!force) console.log("moves.csv file doesn't exist, downloading...");
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/moves.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(MOVES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IMove[] = [];
  await csv2json({
    noheader: false,
    headers: [
      "id",
      "identifier",
      "generationId",
      "typeId",
      "power",
      "pp",
      "accuracy",
      "priority",
      "targetId",
      "damageClassId",
      "effectId",
      "effectChance",
      "contestTypeId",
      "contestEffectId",
      "superContestEffectId",
    ],
  })
    .fromFile(MOVES_CSV_PATH)
    .subscribe((parsedObj) => {
      parsedObj = addAfterField(
        parsedObj,
        "identifier",
        "name",
        toTitleCase(identifierToName(parsedObj.identifier))
      );
      [
        "id",
        "generationId",
        "typeId",
        "power",
        "pp",
        "accuracy",
        "priority",
        "targetId",
        "damageClassId",
        "effectId",
        "effectChance",
        "contestTypeId",
        "contestEffectId",
        "superContestEffectId",
      ].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      for (const key in parsedObj) {
        if (parsedObj.hasOwnProperty(key)) {
          const element = parsedObj[key];
          if (element === "") parsedObj[key] = null;
        }
      }
      if (parsedObj.generationId)
        parsedObj.romanGenerationId = romanize(parsedObj.generationId);
      json.push(parsedObj);
    });
  fs.writeFileSync(MOVES_JSON_PATH, JSON.stringify(json, null));
};

export const collectMoveMeta = async (force: boolean) => {
  if (!fs.existsSync(MOVE_META_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/move_meta.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(MOVE_META_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IStat[] = [];
  await csv2json({
    noheader: false,
    headers: [
      "id",
      "metaCategoryId",
      "metaAilmentId",
      "minHits",
      "maxHits",
      "minTurns",
      "maxTurns",
      "drain",
      "healing",
      "criticalRate",
      "ailmentChance",
      "flinchChance",
      "statChance",
    ],
  })
    .fromFile(MOVE_META_CSV_PATH)
    .subscribe((parsedObj) => {
      [
        "id",
        "metaCategoryId",
        "metaAilmentId",
        "minHits",
        "maxHits",
        "minTurns",
        "maxTurns",
        "drain",
        "healing",
        "criticalRate",
        "ailmentChance",
        "flinchChance",
        "statChance",
      ].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(MOVE_META_JSON_PATH, JSON.stringify(json, null));
};

export const collectPokemonMoves = async (force: boolean) => {
  if (fs.existsSync(POKEMON_MOVES_JSON_PATH) && !force) {
    console.warn(
      "Skipping pokemon_moves as it already exists and takes a long time to convert"
    );
    return;
  }
  if (!fs.existsSync(POKEMON_MOVES_CSV_PATH)) {
    console.log("pokemon_moves.csv file doesn't exist, downloading...");
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon_moves.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(POKEMON_MOVES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  let json: IPokemonMove[] = [];

  let lastPercentage = 0;
  const totalLines =
    fs.readFileSync(POKEMON_MOVES_CSV_PATH).toString().split("\n").length - 1;
  await csv2json({
    noheader: false,
    headers: [
      "pokemonId",
      "versionGroupId",
      "id",
      "moveMethodId",
      "requiredLevel",
      "order",
    ],
  })
    .fromFile(POKEMON_MOVES_CSV_PATH)
    .subscribe((parsedObj, index) => {
      [
        "pokemonId",
        "versionGroupId",
        "id",
        "moveMethodId",
        "requiredLevel",
        "order",
      ].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });

      let entry = json.find((x) => x.id === parsedObj.pokemonId);
      if (!entry) {
        entry = {
          id: parsedObj.pokemonId,
          moves: [],
        };
        json.push(entry);
      }

      const moveIndex = entry.moves.findIndex((x) => x.id === parsedObj.id);
      const move = entry.moves[moveIndex];
      delete parsedObj.pokemonId;
      if (!move) {
        entry.moves.push(parsedObj);
      } else {
        if (parsedObj.versionGroupId > move.versionGroupId) {
          entry.moves.splice(moveIndex, 1, parsedObj);
        } else if (move.versionGroupId === parsedObj.versionGroupId) {
          entry.moves.push(parsedObj);
        }
      }
      const currentPercentage = Math.round((100 * index) / totalLines);
      if (currentPercentage > lastPercentage) {
        lastPercentage = currentPercentage;
        console.log(`Converting pokemon moves ${currentPercentage}% done`);
      }
    });
  json = json
    .map((x) => {
      // eslint-disable-next-line
      const moves: any[] = [];
      const groupedById = groupBy(x.moves, "id");
      for (const id in groupedById) {
        if (Object.prototype.hasOwnProperty.call(groupedById, id)) {
          const element = groupedById[id];
          const groupedByMoveMethodId = groupBy(element, "moveMethodId");
          for (const moveMethodId in groupedByMoveMethodId) {
            if (
              Object.prototype.hasOwnProperty.call(
                groupedByMoveMethodId,
                moveMethodId
              )
            ) {
              const groupedMoves = groupedByMoveMethodId[moveMethodId];
              groupedByMoveMethodId[moveMethodId] = groupedMoves.filter(
                (x) => groupedMoves.indexOf(x) === groupedMoves.lastIndexOf(x)
              );
              groupedMoves.sort((a, b) => b.versionGroupId - a.versionGroupId);
              moves.push(groupedMoves[0]);
            }
          }
        }
      }

      return {
        ...x,
        moves: moves.sort((a, b) => a.id - b.id),
      };
    })
    .sort((a, b) => a.id - b.id);
  fs.writeFileSync(POKEMON_MOVES_JSON_PATH, JSON.stringify(json, null));
};

export const collectPokemonSpecies = async (force: boolean) => {
  if (!fs.existsSync(POKEMON_SPECIES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon_species.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(POKEMON_SPECIES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IPokemonSpecies[] = [];
  await csv2json({
    noheader: false,
    headers: [
      "id",
      "identifier",
      "generationId",
      "evolvesFromSpeciesId",
      "evolutionChainId",
      "colorId",
      "shapeId",
      "habitatId",
      "genderRate",
      "captureRate",
      "baseHappiness",
      "isBaby",
      "hatchCounter",
      "hasGenderDifferences",
      "growthRateId",
      "formsSwitchable",
      "isLegendary",
      "isMythical",
      "order",
      "conquestOrder",
    ],
  })
    .fromFile(POKEMON_SPECIES_CSV_PATH)
    .subscribe((parsedObj) => {
      [
        "id",
        "generationId",
        "evolvesFromSpeciesId",
        "evolutionChainId",
        "colorId",
        "shapeId",
        "habitatId",
        "genderRate",
        "captureRate",
        "baseHappiness",
        "isBaby",
        "hatchCounter",
        "hasGenderDifferences",
        "growthRateId",
        "formsSwitchable",
        "isLegendary",
        "isMythical",
        "order",
        "conquestOrder",
      ].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
        if (
          [
            "isBaby",
            "hasGenderDifferences",
            "formsSwitchable",
            "isLegendary",
            "isMythical",
          ].includes(key)
        ) {
          parsedObj[key] = !!parsedObj[key];
        }
      });
      if (parsedObj.generationId)
        parsedObj.romanGenerationId = romanize(parsedObj.generationId);
      json.push(parsedObj);
    });
  fs.writeFileSync(POKEMON_SPECIES_JSON_PATH, JSON.stringify(json, null));
};

export const collectPokemonTypes = async (force: boolean) => {
  if (!fs.existsSync(POKEMON_TYPES_CSV_PATH) || force) {
    const respones = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon_types.csv`
    );
    if (respones.ok) {
      const csv = await respones.text();
      fs.writeFileSync(POKEMON_TYPES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${respones.status}`
      );
    }
  }
  const json: IPokemonType[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "typeId", "slot"],
  })
    .fromFile(POKEMON_TYPES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "typeId", "slot"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });

      const existingObj = json.find((x) => x.id === parsedObj.id);
      if (existingObj) {
        existingObj.types.push(parsedObj.typeId);
      } else {
        json.push({
          id: parsedObj.id,
          types: [parsedObj.typeId],
        });
      }
    });
  fs.writeFileSync(POKEMON_TYPES_JSON_PATH, JSON.stringify(json, null));
};

export const collectTypes = async (force: boolean) => {
  if (!fs.existsSync(TYPES_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/types.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(TYPES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IType[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "identifier", "generationId", "damageClassId"],
  })
    .fromFile(TYPES_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "generationId", "damageClassId"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      if (parsedObj.generationId)
        parsedObj.romanGenerationId = romanize(parsedObj.generationId);
      json.push(parsedObj);
    });
  fs.writeFileSync(TYPES_JSON_PATH, JSON.stringify(json, null));
};

export const collectTypeEfficacy = async (force: boolean) => {
  if (!fs.existsSync(TYPE_EFFICACY_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/type_efficacy.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(TYPE_EFFICACY_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: ITypeEfficacy[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "targetTypeId", "damageFactor"],
  })
    .fromFile(TYPE_EFFICACY_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "targetTypeId", "damageFactor"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      const existingObj = json.find((x) => x.id === parsedObj.id);
      if (existingObj) {
        existingObj.efficacies.push({
          targetTypeId: parsedObj.targetTypeId,
          damageFactor: parsedObj.damageFactor,
        });
      } else {
        json.push({
          id: parsedObj.id,
          efficacies: [
            {
              targetTypeId: parsedObj.targetTypeId,
              damageFactor: parsedObj.damageFactor,
            },
          ],
        });
      }
    });
  fs.writeFileSync(TYPE_EFFICACY_JSON_PATH, JSON.stringify(json, null));
};

export const collectExperience = async (force: boolean) => {
  if (!fs.existsSync(EXPERIENCE_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/experience.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(EXPERIENCE_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IExperience[] = [];
  await csv2json({
    noheader: false,
    headers: ["growthRateId", "level", "experience"],
  })
    .fromFile(EXPERIENCE_CSV_PATH)
    .subscribe((parsedObj) => {
      ["growthRateId", "level", "experience"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(EXPERIENCE_JSON_PATH, JSON.stringify(json, null));
};

export const collectPokemonEvolutions = async (force: boolean) => {
  if (!fs.existsSync(POKEMON_EVOLUTION_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon_evolution.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(POKEMON_EVOLUTION_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IPokemonEvolution[] = [];
  await csv2json({
    noheader: false,
    headers: [
      "id",
      "evolvedSpeciesId",
      "evolutionTriggerId",
      "triggerItemId",
      "minimumLevel",
      "genderId",
      "locationId",
      "heldItemId",
      "timeOfDay",
      "knownMoveId",
      "knownMoveTypeId",
      "minimumHappiness",
      "minimumBeauty",
      "minimumAffection",
      "relativePhysicalStats",
      "partySpeciesId",
      "partyTypeId",
      "tradeSpeciesId",
      "needsOverworldRain",
      "turnUpsideDown",
    ],
  })
    .fromFile(POKEMON_EVOLUTION_CSV_PATH)
    .subscribe((parsedObj) => {
      [
        "id",
        "evolvedSpeciesId",
        "evolutionTriggerId",
        "triggerItemId",
        "minimumLevel",
        "genderId",
        "locationId",
        "heldItemId",
        "knownMoveId",
        "knownMoveTypeId",
        "minimumHappiness",
        "minimumBeauty",
        "minimumAffection",
        "relativePhysicalStats",
        "partySpeciesId",
        "partyTypeId",
        "tradeSpeciesId",
        "needsOverworldRain",
        "turnUpsideDown",
      ].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
        if (["needsOverworldRain", "turnUpsideDown"].includes(key)) {
          parsedObj[key] = parsedObj[key] === 1;
        }
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(POKEMON_EVOLUTION_JSON_PATH, JSON.stringify(json, null));
};

export const collectStats = async (force: boolean) => {
  if (!fs.existsSync(STATS_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/stats.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(STATS_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IStat[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "damageClassId", "identifier", "isBattleOnly", "gameIndex"],
  })
    .fromFile(STATS_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "damageClassId", "isBattleOnly", "gameIndex"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
        if (["isBattleOnly"].includes(key)) {
          parsedObj[key] = parsedObj[key] === 1;
        }
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(STATS_JSON_PATH, JSON.stringify(json, null));
};

export const collectPokemonStats = async (force: boolean) => {
  if (!fs.existsSync(POKEMON_STATS_CSV_PATH) || force) {
    const response = await fetch(
      `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_ID}/data/v2/csv/pokemon_stats.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(POKEMON_STATS_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IPokemonStat[] = [];
  await csv2json({
    noheader: false,
    headers: ["id", "statId", "baseStat", "effort"],
  })
    .fromFile(POKEMON_STATS_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "statId", "baseStat", "effort"].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(POKEMON_STATS_JSON_PATH, JSON.stringify(json, null));
};

export const collectItems = async (force: boolean) => {
  if (!fs.existsSync(ITEMS_CSV_PATH) || force) {
    const response = await fetch(
      `https://raw.githubusercontent.com/PokeAPI/pokeapi/${BRANCH_OR_COMMIT_ID}/data/v2/csv/items.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(ITEMS_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: IItem[] = [];
  await csv2json({
    noheader: false,
    headers: [
      "id",
      "identifier",
      "categoryId",
      "cost",
      "flingPower",
      "flingEffectId",
    ],
  })
    .fromFile(ITEMS_CSV_PATH)
    .subscribe((parsedObj) => {
      ["id", "categoryId", "cost", "flingPower", "flingEffectId"].forEach(
        (key) => {
          parsedObj[key] = parseInt(parsedObj[key]);
          if (isNaN(parsedObj[key])) parsedObj[key] = 0;
        }
      );
      parsedObj.name = toTitleCase(identifierToName(parsedObj.identifier));
      json.push(parsedObj);
    });
  fs.writeFileSync(ITEMS_JSON_PATH, JSON.stringify(json, null));
};

export const collectNatures = async (force: boolean) => {
  if (!fs.existsSync(NATURES_CSV_PATH) || force) {
    const response = await fetch(
      `https://raw.githubusercontent.com/PokeAPI/pokeapi/${BRANCH_OR_COMMIT_ID}/data/v2/csv/natures.csv`
    );
    if (response.ok) {
      const csv = await response.text();
      fs.writeFileSync(NATURES_CSV_PATH, csv);
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
  const json: INature[] = [];
  await csv2json({
    noheader: false,
    headers: [
      "id",
      "identifier",
      "decreasedStatId",
      "increasedStatId",
      "hatesFlavorId",
      "likesFlavorId",
      "gameIndex",
    ],
  })
    .fromFile(NATURES_CSV_PATH)
    .subscribe((parsedObj) => {
      [
        "id",
        "decreasedStatId",
        "increasedStatId",
        "hatesFlavorId",
        "likesFlavorId",
        "gameIndex",
      ].forEach((key) => {
        parsedObj[key] = parseInt(parsedObj[key]);
        if (isNaN(parsedObj[key])) parsedObj[key] = 0;
      });
      json.push(parsedObj);
    });
  fs.writeFileSync(NATURES_JSON_PATH, JSON.stringify(json, null));
};

export const collectMovesets = async (force: boolean) => {
  if (!fs.existsSync(MOVESETS_JSON_PATH) || force) {
    const response = await fetch(
      `https://gist.githubusercontent.com/zihadmahiuddin/4e43bfee56fb81e33c8702a149f20bfe/raw/af0938c93cf4712aebe1a228c85cef943b41614a/movesets.json`
    );
    if (response.ok) {
      const json = await response.json();
      fs.writeFileSync(MOVESETS_JSON_PATH, JSON.stringify(json));
    } else {
      console.warn(
        `Skipping data collection due to HTTP status code ${response.status}`
      );
    }
  }
};

export const collectData = async (force: boolean) => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
  }

  console.log("Collecting growth rate names...");
  await collectGrowthRateNames(force);
  console.log("Growth rate names collected!");
  console.log("Collecting type names...");
  await collectTypeNames(force);
  console.log("Type names collected!");
  console.log("Collecting pokemon habitat names...");
  await collectHabitatNames(force);
  console.log("Pokemon habitat names collected!");
  console.log("Collecting stat names...");
  await collectStatNames(force);
  console.log("Stat names collected!");
  console.log("Collecting nature names...");
  await collectNatureNames(force);
  console.log("Nature names collected!");
  console.log("Collecting pokemon species names...");
  await collectPokemonSpeciesNames(force);
  console.log("Pokemon species names collected!");

  console.log("Collecting pokemon data...");
  await collectPokemon(force);
  console.log("Pokemon data collected!");
  console.log("Collecting moves data...");
  await collectMoves(force);
  console.log("Moves data collected!");
  console.log("Collecting move meta data...");
  await collectMoveMeta(force);
  console.log("Moves data collected!");
  console.log("Collecting pokemon move meta data...");
  await collectPokemonMoves(force);
  console.log("Pokemon movesets collected!");
  console.log("Collecting pokemon movesets data...");
  await collectMovesets(force);
  console.log("Pokemon movesets data collected!");

  console.log("Collecting experience data...");
  await collectExperience(force);
  console.log("Experience data collected!");
  console.log("Collecting pokemon evolutions data...");
  await collectPokemonEvolutions(force);
  console.log("Pokemon evolutions data collected!");

  console.log("Collecting pokemon species data...");
  await collectPokemonSpecies(force);
  console.log("Pokemon species data collected!");
  console.log("Collecting type data...");

  await collectTypes(force);
  console.log("Type data collected!");
  console.log("Collecting type efficacy data...");
  await collectTypeEfficacy(force);
  console.log("Type efficacy data collected!");
  console.log("Collecting pokemon types data...");
  await collectPokemonTypes(force);
  console.log("Pokemon types data collected!");

  console.log("Collecting stats...");
  await collectStats(force);
  console.log("Stats collected!");
  console.log("Collecting pokemon stats...");
  await collectPokemonStats(force);
  console.log("Pokemons stats collected!");

  console.log("Collecting items...");
  await collectItems(force);
  console.log("Items collected!");
  console.log("Collecting natures...");
  await collectNatures(force);
  console.log("Natures collected!");
};

export const collectResources = async () => {
  const noData = !!(yargs.argv["nodata"] || yargs.argv["d"]) || false;
  const force = !!(yargs.argv["force"] || yargs.argv["f"]) || false;
  if (force) console.log("Running in forced mode...");
  if (!noData) {
    console.log("Collecting data...");
    await collectData(force);
    console.log("Data collected!");
  }
};

const main = async () => {
  console.log("Collecting resources...");
  await collectResources();
  console.log("Resources collected!");
};

// Helper functions
export const getPokemonImageUrl = async (
  id: number | string,
  shiny = false
) => {
  id = id.toString();

  return `https://pokecord-images.s3.wasabisys.com/${
    shiny ? "shiny" : "regular"
  }/${id}.png`;

  // shiny
  // if (shiny) {
  // return `https://res.cloudinary.com/zihad-cloudinary/image/upload/v${Math.round(
  //   Date.now() / 1000
  // )}/pokecord/images/pokemon/shiny/${id}.png`;
  // }

  // normal
  // official site
  // let url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${"0".repeat(
  //   3 - id.toString().length
  // )}${id.toString()}.png`;

  // our local one
  // const url = `${PROTOCOL}://${HOST}:${PORT}/assets/images/pokemon/${id}.png`;

  // another unofficial one, which is missing some images
  // let url = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

  // to return the best available one
  // if (fs.existsSync(path.join(POKEMON_IMAGES_PATH, id + ".png"))) {
  //   const tmpUrl = `${PROTOCOL}://${HOST}:${PORT}/assets/images/pokemon/${id}.png`;
  //   const response = await fetch(tmpUrl);
  //   if (response.ok) url = tmpUrl;
  // } else {
  //   const tmpUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  //   const response = await fetch(tmpUrl);
  //   if (response.ok) url = tmpUrl;
  // }
  // return url;
};

if (require?.main === module) {
  main().catch(console.error);
}
