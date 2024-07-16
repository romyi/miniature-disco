import { HeroProps, Pool3 } from "../t";

type Pointer = 0 | 1 | 2 | 3 | 4;
type Method = (pool: Pool3, arg: HeroProps) => void;

interface Config {
  counter?: boolean;
  start: Pointer;
  inclusive?: boolean;
}

const tests = { 1: "A", 2: "B", 3: null, 4: "D", 5: null } as const;

function toPoi(num: unknown): num is Pointer {
  const isInt = typeof num === "number" && Math.trunc(num) === num;
  const isBound = typeof num === "number" && num >= 0 && num <= 4;
  return isInt && isBound;
}
function present(poi: Pointer, pool: Pool3) {
  return pool.heroes[poi] !== undefined;
}
function shift(poi: Pointer): Pointer {
  let s = poi + 1;
  if (toPoi(s)) return s;
  return 0;
}
function shiftback(poi: Pointer): Pointer {
  let s = poi - 1;
  if (toPoi(s)) return s;
  return 4;
}

export function cwse(
  pool: Pool3,
  method: Method,
  { start, inclusive = true, counter = false }: Config
) {
  let current = start;
  let step = shift;
  if (counter) {
    step = shiftback;
  }
  if (!inclusive) {
    current = step(current);
  }
  if (present(current, pool)) {
    method(pool, pool.heroes[current] as HeroProps);
  }
  current = step(current);
  while (current !== start) {
    if (present(current, pool)) {
      method(pool, pool.heroes[current] as HeroProps);
    }
    current = step(current);
  }
}
