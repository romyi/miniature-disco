import { roll } from "./roll";
import { HeroProps, ItemProps, Pool3 } from "../t";
import { industries, primaries } from "./incomes";

const idle = {
  name: "idle",
  do: function () {},
};

const to_roll = {
  name: "to roll",
  do: function (items: Pool3, item: ItemProps, hero: HeroProps) {
    hero.state = to_build;
    item.data = roll();
    primaries(items);
    industries(items);
  },
};

const to_build = {
  name: "to build",
  do: function (items: Pool3, item: ItemProps, hero: HeroProps) {
    hero.state = to_roll;
  },
};

export { idle, to_build, to_roll };
