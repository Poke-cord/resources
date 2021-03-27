import path from "path";

export const BASE_PATH = path.parse(path.join(__dirname, "..")).dir;

export const DATA_PATH = path.join(BASE_PATH, "data");
export const EXPERIENCE_CSV_PATH = path.join(DATA_PATH, "experience.csv");
export const EXPERIENCE_JSON_PATH = path.join(DATA_PATH, "experience.json");
export const GROWTH_RATES_CSV_PATH = path.join(DATA_PATH, "growth_rates.csv");
export const GROWTH_RATES_JSON_PATH = path.join(DATA_PATH, "growth_rates.json");
export const POKEMON_CSV_PATH = path.join(DATA_PATH, "pokemon.csv");
export const POKEMON_JSON_PATH = path.join(DATA_PATH, "pokemon.json");
export const MOVES_CSV_PATH = path.join(DATA_PATH, "moves.csv");
export const MOVES_JSON_PATH = path.join(DATA_PATH, "moves.json");
export const MOVE_META_CSV_PATH = path.join(DATA_PATH, "move_meta.csv");
export const MOVE_META_JSON_PATH = path.join(DATA_PATH, "move_meta.json");
export const POKEMON_MOVES_CSV_PATH = path.join(DATA_PATH, "pokemon_moves.csv");
export const POKEMON_MOVES_JSON_PATH = path.join(
  DATA_PATH,
  "pokemon_moves.json"
);
export const POKEMON_SPECIES_CSV_PATH = path.join(
  DATA_PATH,
  "pokemon_species.csv"
);
export const POKEMON_SPECIES_JSON_PATH = path.join(
  DATA_PATH,
  "pokemon_species.json"
);
export const POKEMON_SPECIES_NAMES_CSV_PATH = path.join(
  DATA_PATH,
  "pokemon_species_names.csv"
);
export const POKEMON_SPECIES_NAMES_JSON_PATH = path.join(
  DATA_PATH,
  "pokemon_species_names.json"
);
export const POKEMON_EVOLUTION_CSV_PATH = path.join(
  DATA_PATH,
  "pokemon_evolution.csv"
);
export const POKEMON_EVOLUTION_JSON_PATH = path.join(
  DATA_PATH,
  "pokemon_evolution.json"
);
export const TYPE_NAMES_CSV_PATH = path.join(DATA_PATH, "type_names.csv");
export const TYPE_NAMES_JSON_PATH = path.join(DATA_PATH, "type_names.json");
export const TYPES_CSV_PATH = path.join(DATA_PATH, "types.csv");
export const TYPES_JSON_PATH = path.join(DATA_PATH, "types.json");
export const TYPE_EFFICACY_CSV_PATH = path.join(DATA_PATH, "type_efficacy.csv");
export const TYPE_EFFICACY_JSON_PATH = path.join(
  DATA_PATH,
  "type_efficacy.json"
);
export const POKEMON_TYPES_CSV_PATH = path.join(DATA_PATH, "pokemon_types.csv");
export const POKEMON_TYPES_JSON_PATH = path.join(
  DATA_PATH,
  "pokemon_types.json"
);
export const POKEMON_HABITAT_NAMES_CSV_PATH = path.join(
  DATA_PATH,
  "pokemon_habitat_names.csv"
);
export const POKEMON_HABITAT_NAMES_JSON_PATH = path.join(
  DATA_PATH,
  "pokemon_habitat_names.json"
);
export const STAT_NAMES_CSV_PATH = path.join(DATA_PATH, "stats_names.csv");
export const STAT_NAMES_JSON_PATH = path.join(DATA_PATH, "stats_names.json");
export const STATS_CSV_PATH = path.join(DATA_PATH, "stats.csv");
export const STATS_JSON_PATH = path.join(DATA_PATH, "stats.json");
export const POKEMON_STATS_CSV_PATH = path.join(DATA_PATH, "pokemon_stats.csv");
export const POKEMON_STATS_JSON_PATH = path.join(
  DATA_PATH,
  "pokemon_stats.json"
);

export const ITEMS_CSV_PATH = path.join(DATA_PATH, "items.csv");
export const ITEMS_JSON_PATH = path.join(DATA_PATH, "items.json");

export const NATURE_NAMES_CSV_PATH = path.join(DATA_PATH, "nature_names.csv");
export const NATURE_NAMES_JSON_PATH = path.join(DATA_PATH, "nature_names.json");
export const NATURES_CSV_PATH = path.join(DATA_PATH, "natures.csv");
export const NATURES_JSON_PATH = path.join(DATA_PATH, "natures.json");

export const MOVESETS_JSON_PATH = path.join(DATA_PATH, "movesets.json");

export const POKEMON_FORMS = [
  "-normal",
  "-plant",
  "-altered",
  "-land",
  "-red-striped",
  "-standard",
  "-incarnate",
  "-ordinary",
  "-aria",
  "-shield",
  "-average",
  "-baile",
  "-midday",
  "-solo",
  "-red-meteor",
  "-disguised",
];

export const POKEMON_FORMS_REGEX = new RegExp(`(${POKEMON_FORMS.join("|")})$`);
