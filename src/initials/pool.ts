import { configs } from "../c";
import { HeroProps, Pool3 } from "../t";
import { idle, to_roll } from "./states";

const array = new Uint32Array(100);

function build_establishments() {
  const esb = [];
  const arr = new Uint32Array(200);
  for (let group of configs) {
    for (let i = group[0]; i <= group[1]; i++) {
      esb[i] = { ...group[2], key: self.crypto.getRandomValues(array)[i] };
    }
  }
  return esb;
}

function init_pool(): Pool3 {
  return {
    heroes: [] as HeroProps[],
    dice: [{ title: "item", name: "dice", data: [1, 1] }],
    establishment: build_establishments(),
  };
}

function add(name: string, pool: Pool3) {
  pool.heroes.push({
    title: "hero",
    name,
    state: idle,
    balance: 10,
  });
  const field = pool.establishment.find(
    (est) => est.title === "wheat field" && est.state === null
  );
  if (field) field.state = name;
  const bakery = pool.establishment.find(
    (est) => est.title === "bakery" && est.state === null
  );
  if (bakery) bakery.state = name;
}

function start(pool: Pool3) {
  pool.heroes[0].state = to_roll;
}

export { init_pool, add, start };
