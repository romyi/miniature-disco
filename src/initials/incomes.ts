import { establishment_pointers, HEROES } from "../c";
import { HeroProps, ModKeys, Pool3 } from "../t";

export function primaries(items: Pool3) {
  HEROES.forEach((hero_index) => {
    if (!items.heroes[hero_index]) return;
    const income = items.establishment
      .filter((e) => {
        return (
          e.state === items.heroes[hero_index].name &&
          e.blue &&
          items.dice[0].data.includes(e.dice_roll)
        );
      })
      .reduce((p, c) => {
        if (!c.blue) return p + 0;
        return p + c.blue.income;
      }, 0);
    items.heroes[hero_index].balance += income;
  });
}

export function industries(items: Pool3) {
  HEROES.forEach((hero_index) => {
    if (!items.heroes[hero_index]) return;
    const income = items.establishment
      .filter((establishment) => {
        return (
          establishment.state === items.heroes[hero_index].name &&
          establishment.green &&
          items.dice[0].data.includes(establishment.dice_roll)
        );
      })
      .reduce((sum, establishment) => {
        if (!establishment.green) return sum + 0;
        return (
          items.modificators[establishment.green.modifier][hero_index] *
          establishment.green.income
        );
      }, 0);
    items.heroes[hero_index].balance += income;
  });
}

export function establish_from_group(
  items: Pool3,
  type: ModKeys,
  hero_index: number
): number {
  let id = -1;
  for (
    let i = establishment_pointers[type][0];
    i <= establishment_pointers[type][1];
    i++
  ) {
    const item = items.establishment[i];
    if (item.state !== null) continue;
    item.state = items.heroes[hero_index].name;
    id = item.key;
    items.modificators[item.title][hero_index] += 1;
    break;
  }
  return id;
}
