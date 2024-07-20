import { roll } from "./roll";
import { HeroProps, ItemProps, ModKeys, Pool3 } from "../t";
import {
  establish_from_group,
  industries,
  primaries,
  services,
} from "./incomes";

const idle = {
  name: "idle",
  do: function () {},
};

const to_roll = {
  name: "to roll",
  do: function (items: Pool3, data: unknown) {
    items.dice[0].data = roll();
    const index = data.hero as number;
    items.heroes[index].state = to_build;
    services(items);
    primaries(items);
    industries(items);
  },
};

const to_build = {
  name: "to build",
  do: function (items: Pool3, data: unknown) {
    if (data.construction) {
      establish_from_group(items, data.construction as ModKeys, data.hero);
    }
    items.heroes[data.hero].state = idle;
    let nextindex =
      Number(data.hero) + 1 > items.heroes.length - 1
        ? 0
        : Number(data.hero) + 1;
    items.heroes[nextindex].state = to_roll;
  },
};

export { idle, to_build, to_roll };
