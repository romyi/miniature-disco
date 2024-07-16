import { roll } from "./roll";
import { HeroProps, ItemProps, Pool3 } from "../t";
import { cwse } from "./cwse";
import { industries } from "./incomes";

const idle = {
  name: "idle",
  do: function () {},
};

const to_roll = {
  name: "to roll",
  do: function (items: Pool3, item: ItemProps, hero: HeroProps) {
    hero.state = to_build;
    item.data = roll();
    cwse(
      items,
      (items, hero) => {
        hero.balance += items.establishment
          .filter(
            (esb) =>
              esb.state === hero.name &&
              esb.blue !== undefined &&
              items.dice[0].data.includes(esb.dice_roll)
          )
          .reduce((prev, cur) => prev + cur.blue.income, 0);
      },
      { start: items.heroes.findIndex((h) => h.state.name === "to roll") }
    );
  },
};

const to_build = {
  name: "to build",
  do: function (items: Pool3, item: ItemProps, hero: HeroProps) {
    hero.state = to_roll;
  },
};

export { idle, to_build, to_roll };
