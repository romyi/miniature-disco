import { Establishment, ModKeys } from "./t";

export const HEROES = [0, 1, 2, 3, 4];
export const SIZE = 100;

const corn = {
  title: "corn",
  key: 1,
  state: null,
  dice_roll: 1,
  blue: {
    income: 1,
  },
} satisfies Establishment;
const bake = {
  title: "bake",
  key: 1,
  state: null,
  dice_roll: 3,
  green: {
    income: 1,
    modifier: "corn",
  },
} satisfies Establishment;

export const establishment_pointers: Record<
  ModKeys,
  [number, number, Establishment]
> = {
  corn: [0, 9, corn],
  bake: [10, 19, bake],
};
