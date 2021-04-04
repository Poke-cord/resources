// #region Imports
import csv2json from "csvtojson";
import fetch from "node-fetch";
import fs from "fs";
import groupBy from "lodash.groupby";
import path from "path";
import yargs from "yargs";

import {
  addAfterField,
  identifierToName,
  toTitleCase,
  romanize,
} from "../util";
import { DATA_PATH } from "../util/constants";
import { IMachine } from "../util/structures";
//  #endregion

const BRANCH_OR_COMMIT_HASH = "5e803da514ade0d3770a8fef2ee093250f8dfc20";

interface ResourceInfo {
  booleanHeaders?: string[];
  headers?: string[];
  numberHeaders?: string[];
  remoteUrl: string;
  // eslint-disable-next-line
  prePush?: (parsedObj: any, elements: any[], lineNumber: number) => any;
  // eslint-disable-next-line
  preSave?: (elements: any[]) => any[];
}

const nameHeaders = ["id", "languageId", "name"];
const nameNumberHeaders = ["id", "languageId"];

const resourceInfos: ResourceInfo[] = [
  // #region Growth Rate Names
  {
    headers: nameHeaders,
    numberHeaders: nameNumberHeaders,
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/growth_rate_prose.csv`,
  },
  // #endregion
  // #region Stat names
  {
    headers: nameHeaders,
    numberHeaders: nameNumberHeaders,
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/stat_names.csv`,
  },
  // #endregion
  // #region Type names
  {
    headers: nameHeaders,
    numberHeaders: nameNumberHeaders,
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/type_names.csv`,
  },
  // #endregion
  // #region Nature names
  {
    headers: nameHeaders,
    numberHeaders: nameNumberHeaders,
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/nature_names.csv`,
  },
  // #endregion
  // #region Habitat names
  {
    headers: nameHeaders,
    numberHeaders: nameNumberHeaders,
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_habitat_names.csv`,
    prePush: (parsedObj) => {
      parsedObj.name = toTitleCase(parsedObj.name);
    },
  },
  // #endregion
  // #region Species names
  {
    headers: [...nameHeaders, "genus"],
    numberHeaders: nameNumberHeaders,
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_species_names.csv`,
  },
  // #endregion
  // #region Item names
  {
    headers: nameHeaders,
    numberHeaders: nameNumberHeaders,
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/item_names.csv`,
  },
  // #endregion
  // #region Pokemon
  {
    prePush: (parsedObj) => {
      parsedObj.isDefault = parsedObj.isDefault === "1";
      parsedObj = addAfterField(
        parsedObj,
        "identifier",
        "name",
        toTitleCase(identifierToName(parsedObj.identifier))
      );
      return parsedObj;
    },
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
    numberHeaders: ["id", "speciesId", "height", "weight", "baseExp", "order"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon.csv`,
  },
  // #endregion
  // #region Moves
  {
    prePush: (parsedObj) => {
      parsedObj = addAfterField(
        parsedObj,
        "identifier",
        "name",
        toTitleCase(identifierToName(parsedObj.identifier))
      );
      if (parsedObj.generationId)
        parsedObj.romanGenerationId = romanize(parsedObj.generationId);
      for (const key in parsedObj) {
        if (parsedObj.hasOwnProperty(key)) {
          const element = parsedObj[key];
          if (element === "") parsedObj[key] = null;
        }
      }
      return parsedObj;
    },
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
    numberHeaders: [
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
    ],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/moves.csv`,
  },
  // #endregion
  // #region Move Meta
  {
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
    numberHeaders: [
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
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/move_meta.csv`,
  },
  // #endregion
  // #region Pokemon Moves
  {
    headers: [
      "pokemonId",
      "versionGroupId",
      "id",
      "moveMethodId",
      "requiredLevel",
      "order",
    ],
    numberHeaders: [
      "pokemonId",
      "versionGroupId",
      "id",
      "moveMethodId",
      "requiredLevel",
      "order",
    ],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_moves.csv`,

    preSave: (elements) => {
      // eslint-disable-next-line
      const entries: any[] = [];
      for (const parsedObj of elements) {
        let entry = entries.find((x) => x.id === parsedObj.pokemonId);
        if (!entry) {
          entry = {
            id: parsedObj.pokemonId,
            moves: [],
          };
          entries.push(entry);
        }

        const moveIndex = entry.moves.findIndex(
          // eslint-disable-next-line
          (x: any) => x.id === parsedObj.id
        );
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
      }

      return entries
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
                    (x) =>
                      groupedMoves.indexOf(x) === groupedMoves.lastIndexOf(x)
                  );
                  groupedMoves.sort(
                    (a, b) => b.versionGroupId - a.versionGroupId
                  );
                  delete groupedMoves[0].pokemonId;
                  moves.push(groupedMoves[0]);
                }
              }
            }
          }

          return {
            id: x.id,
            moves: moves.sort((a, b) => a.id - b.id),
          };
        })
        .sort((a, b) => a.id - b.id);
    },
  },
  // #endregion
  // #region Species
  {
    booleanHeaders: [
      "isBaby",
      "hasGenderDifferences",
      "formsSwitchable",
      "isLegendary",
      "isMythical",
    ],
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
    numberHeaders: [
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
      "hatchCounter",
      "growthRateId",
      "order",
      "conquestOrder",
    ],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_species.csv`,
    prePush: (parsedObj) => {
      if (parsedObj.generationId)
        parsedObj.romanGenerationId = romanize(parsedObj.generationId);
      return parsedObj;
    },
  },
  // #endregion
  // #region Pokemon types
  {
    headers: ["id", "typeId", "slot"],
    numberHeaders: ["id", "typeId", "slot"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_types.csv`,
    preSave: (elements) => {
      // eslint-disable-next-line
      const editedElements: any[] = [];
      for (const element of elements) {
        const existingElement = editedElements.find((x) => x.id === element.id);
        if (existingElement) {
          existingElement.types.push(element.typeId);
        } else {
          editedElements.push({
            id: element.id,
            types: [element.typeId],
          });
        }
      }
      return editedElements;
    },
  },
  // #endregion
  // #region Types
  {
    headers: ["id", "identifier", "generationId", "damageClassId"],
    numberHeaders: ["id", "generationId", "damageClassId"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/types.csv`,
    prePush: (parsedObj) => {
      if (parsedObj.generationId)
        parsedObj.romanGenerationId = romanize(parsedObj.generationId);
      return parsedObj;
    },
  },
  // #endregion
  // #region Type efficacy
  {
    headers: ["id", "targetTypeId", "damageFactor"],
    numberHeaders: ["id", "targetTypeId", "damageFactor"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/type_efficacy.csv`,
    preSave: (elements) => {
      // eslint-disable-next-line
      const editedElements: any[] = [];
      for (const element of elements) {
        const existingElement = editedElements.find((x) => x.id === element.id);
        if (existingElement) {
          existingElement.efficacies.push({
            targetTypeId: element.targetTypeId,
            damageFactor: element.damageFactor,
          });
        } else {
          editedElements.push({
            id: element.id,
            efficacies: [
              {
                targetTypeId: element.targetTypeId,
                damageFactor: element.damageFactor,
              },
            ],
          });
        }
      }
      return editedElements;
    },
  },
  // #endregion
  // #region Experience
  {
    headers: ["growthRateId", "level", "experience"],
    numberHeaders: ["growthRateId", "level", "experience"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/experience.csv`,
  },
  // #endregion
  // #region Stats
  {
    booleanHeaders: ["isBattleOnly"],
    headers: ["id", "damageClassId", "identifier", "isBattleOnly", "gameIndex"],
    numberHeaders: ["id", "damageClassId", "gameIndex"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/stats.csv`,
  },
  {
    booleanHeaders: ["needsOverworldRain", "turnUpsideDown"],
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
      "minimumHapiness",
      "minimumBeauty",
      "minimumAffection",
      "relativePhysicalStats",
      "partySpeciesId",
      "partyTypeId",
      "tradeSpeciesId",
      "needsOverworldRain",
      "turnUpsideDown",
    ],
    numberHeaders: [
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
      "minimumHapiness",
      "minimumBeauty",
      "minimumAffection",
      "relativePhysicalStats",
      "partySpeciesId",
      "partyTypeId",
      "tradeSpeciesId",
    ],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_evolution.csv`,
  },
  // #endregion
  // #region Pokemon stats
  {
    headers: ["id", "statId", "baseStat", "effort"],
    numberHeaders: ["id", "statId", "baseStat", "effort"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_stats.csv`,
  },
  // #endregion
  // #region Items
  {
    headers: [
      "id",
      "identifier",
      "categoryId",
      "cost",
      "flingPower",
      "flingEffectId",
    ],
    numberHeaders: ["id", "categoryId", "cost", "flingPower", "flingEffectId"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/items.csv`,
    prePush: (parsedObj) => {
      parsedObj.name = toTitleCase(identifierToName(parsedObj.identifier));
    },
  },
  // #endregion
  // #region Natures
  {
    headers: [
      "id",
      "identifier",
      "decreasedStatId",
      "increasedStatId",
      "hatesFlavorId",
      "likesFlavorId",
      "gameIndex",
    ],
    numberHeaders: [
      "id",
      "decreasedStatId",
      "increasedStatId",
      "hatesFlavorId",
      "likesFlavorId",
      "gameIndex",
    ],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/natures.csv`,
    prePush: (parsedObj) => {
      parsedObj.name = toTitleCase(identifierToName(parsedObj.identifier));
    },
  },
  // #endregion
  // #region Movesets
  {
    remoteUrl:
      "https://gist.githubusercontent.com/zihadmahiuddin/4e43bfee56fb81e33c8702a149f20bfe/raw/af0938c93cf4712aebe1a228c85cef943b41614a/movesets.json",
  },
  // #endregion
  // #region Machines
  {
    headers: ["tmId", "versionGroupId", "itemId", "moveId"],
    numberHeaders: ["tmId", "versionGroupId", "itemId", "moveId"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/machines.csv`,
    preSave: (elements: IMachine[]) => {
      // eslint-disable-next-line
      const final: IMachine[] = [];
      for (const element of elements) {
        const index = final.findIndex((x) => x.tmId === element.tmId);
        if (index >= 0) {
          if (element.versionGroupId > final[index].versionGroupId) {
            final[index] = element;
          }
        } else {
          final.push(element);
        }
      }
      return final;
    },
  },
  // #endregion
  // #region Pokemon Forms
  {
    booleanHeaders: ["isDefault", "isBattleOnly", "isMega"],
    headers: [
      "id",
      "identifier",
      "formIdentifier",
      "pokemonId",
      "introducedInVersionGroupId",
      "isDefault",
      "isBattleOnly",
      "isMega",
      "formOrder",
      "order",
    ],
    numberHeaders: [
      "id",
      "pokemonId",
      "introducedInVersionGroupId",
      "formOrder",
      "order",
    ],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_forms.csv`,
  },
  // #endregion
  // #region Pokemon Form Names
  {
    headers: ["id", "languageId", "formName", "pokemonName"],
    numberHeaders: ["id", "languageId"],
    remoteUrl: `https://github.com/PokeAPI/pokeapi/raw/${BRANCH_OR_COMMIT_HASH}/data/v2/csv/pokemon_form_names.csv`,
  },
  // #endregion
];

export const collect = async (resourceInfo: ResourceInfo, force = false) => {
  const parsedPath = path.parse(resourceInfo.remoteUrl);
  const fileName = path.parse(resourceInfo.remoteUrl).name,
    jsonPath = path.join(DATA_PATH, `${fileName}.json`);
  if (parsedPath.ext === ".csv") {
    // eslint-disable-next-line
    let json: any[] = [];
    const csvPath = path.join(DATA_PATH, `${fileName}.csv`);

    if (!fs.existsSync(csvPath) || force) {
      const response = await fetch(resourceInfo.remoteUrl);
      if (response.ok) {
        const csv = await response.text();
        fs.writeFileSync(csvPath, csv);
      } else {
        console.warn(
          `Skipping data collection due to HTTP status code ${response.status}`
        );
      }
    }

    await csv2json({
      noheader: false,
      headers: resourceInfo.headers,
    })
      .fromFile(csvPath)
      .subscribe((parsedObj, lineNumber) => {
        if (resourceInfo.prePush) {
          parsedObj =
            resourceInfo.prePush(parsedObj, json, lineNumber) || parsedObj;
        }
        [
          ...new Set([
            ...(resourceInfo.numberHeaders || []),
            ...(resourceInfo.booleanHeaders || []),
          ]),
        ].forEach((key) => {
          parsedObj[key] = parseInt(parsedObj[key]);
          if (isNaN(parsedObj[key])) {
            parsedObj[key] = 0;
          }
          if (resourceInfo.booleanHeaders?.includes(key)) {
            parsedObj[key] = !!parsedObj[key];
          }
        });
        json.push(parsedObj);
      });
    if (resourceInfo.preSave) {
      json = resourceInfo.preSave(json) || json;
    }
    fs.writeFileSync(jsonPath, JSON.stringify(json));
  } else if (parsedPath.ext === ".json") {
    if (!fs.existsSync(jsonPath) || force) {
      const response = await fetch(resourceInfo.remoteUrl);
      if (response.ok) {
        const json = await response.json();
        fs.writeFileSync(jsonPath, JSON.stringify(json));
      } else {
        console.warn(
          `Skipping data collection due to HTTP status code ${response.status}`
        );
      }
    }
  }
};

export const collectData = async (force: boolean) => {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
  }
  for (const resourceInfo of resourceInfos) {
    const fileName = path.parse(resourceInfo.remoteUrl).name;
    console.log(`Collecting ${fileName}`);
    await collect(resourceInfo, force);
    console.log(`${fileName} collected`);
  }
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

if (require?.main === module) {
  main().catch(console.error);
}
