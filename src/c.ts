import { EstablishmentConfig } from "./t";

export const HEROES = [0, 1, 2, 3, 4];
export const DICE = 5;
export const ESTABLISHMENTS = [10, 99];
export const SIZE = 100;

const whf = {
  title: "wheat field",
  key: 1,
  state: null,
  dice_roll: 1,
  cost: 1,
  blue: {
    income: 1,
    tags: ["wheat_field", "agriculture"],
  },
};
const bkr = {
  title: "bakery",
  key: 1,
  state: null,
  dice_roll: 3,
  cost: 1,
  green: {
    income: 1,
    modifiers: ["wheat_field"],
  },
};

const whf_config: EstablishmentConfig = [0, 4, whf];
const bkr_config: EstablishmentConfig = [5, 9, bkr];

export const configs = [whf_config, bkr_config];
