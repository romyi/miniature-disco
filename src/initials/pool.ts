import { establishment_pointers } from "../c";
import { Establishment, HeroProps, modificators, Pool3 } from "../t";
import { establish_from_group } from "./incomes";
import { idle, to_roll } from "./states";

const array = new Uint32Array(100);

function build_establishments(): Establishment[] {
  const esb = [] as Establishment[];
  const arr = new Uint32Array(200);
  Object.values(establishment_pointers).forEach((config) => {
    for (let i = config[0]; i <= config[1]; i++) {
      esb[i] = { ...config[2], key: self.crypto.getRandomValues(array)[i] };
    }
  });
  return esb;
}

function build_mod_table() {
  const t = {} as Record<(typeof modificators)[number], number[]>;
  modificators.forEach((mod) => (t[mod] = Array(5).fill(0)));
  return t;
}

function init_pool(): Pool3 {
  return {
    heroes: [] as HeroProps[],
    modificators: build_mod_table(),
    dice: [{ title: "item", name: "dice", data: [1, 1] }],
    establishment: build_establishments(),
  };
}

function add(name: string, pool: Pool3) {
  const nl = pool.heroes.push({
    title: "hero",
    name,
    state: idle,
    balance: 10,
    stats: {},
  });
  establish_from_group(pool, "bake", nl - 1);
  establish_from_group(pool, "corn", nl - 1);
  establish_from_group(pool, "corn", nl - 1);
  establish_from_group(pool, "corn", nl - 1);
}

function start(pool: Pool3) {
  pool.heroes[0].state = to_roll;
}

export { init_pool, add, start };
