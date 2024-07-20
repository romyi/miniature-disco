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

function reverse_sequence(items: HeroProps[]) {
  let turns = items.findIndex((hero) => hero.state.name !== "idle");
  const sequence = Array(items.length).fill(null);
  for (let i = 0; i < 5; i++) {
    sequence[i] = turns;
    turns = turns === 0 ? 4 : turns - 1;
  }
  return sequence;
}

export function services(items: Pool3) {
  const reverse = reverse_sequence(items.heroes);
  const turns_index = reverse[0];
  reverse.forEach((index) => {
    if (items.heroes[index] === undefined) return;
    if (index === turns_index) return;
    const turner = items.heroes[turns_index].name;
    const benefit = items.heroes[index].name;
    for (let establishment of items.establishment.filter(
      (establishment) =>
        establishment.state === benefit &&
        items.dice[0].data.includes(establishment.dice_roll)
    )) {
      if (!establishment.red) continue;
      if (items.heroes[turns_index].balance >= establishment.red.income) {
        console.log(
          turner + " - " + establishment.red.income + " -> " + benefit
        );
        items.heroes[index].balance += establishment.red.income;
        items.heroes[turns_index].balance -= establishment.red.income;
        continue;
      }
      if (items.heroes[turns_index].balance === 0) {
        console.log(turner + " -nothing-> " + benefit);
        continue;
      }
      items.heroes[index].balance += items.heroes[turns_index].balance;
      console.log(
        turner + " - " + items.heroes[turns_index].balance + " -> " + benefit
      );
      items.heroes[turns_index].balance = 0;
    }
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
