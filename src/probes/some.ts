import { B, G, R } from "./cards";
import { roll } from "../initials/roll";

const { apple_orchard } = B;
const { produce_market } = G;
const { caffee } = R;

interface Card {
  title: string;
  state: number | null;
  dice_roll: number;
  blue?: { income: number; tags: string[] };
  red?: { income: number };
  green?: { income: number; modifiers: string[] };
}

const establishments: Card[] = [
  { ...caffee, state: 3 },
  { ...caffee, state: 1 },
  { ...produce_market, state: 2 },
  { ...apple_orchard, state: 2 },
  { ...apple_orchard, state: 2 },
  { ...apple_orchard, state: 1 },
  { ...apple_orchard, state: 3 },
  { ...apple_orchard, state: 1 },
];

let incomes = {
  1: 0,
  2: 0,
  3: 0,
};

let blues: [
  Record<string, number>,
  Record<string, number>,
  Record<string, number>
] = [{}, {}, {}];

const clockwise = [1, 2, 3];
const counterclockwise = clockwise.toReversed();

function red_calc(turns: 1 | 2 | 3, dice: number) {
  let order = [];
  let st_index = counterclockwise.findIndex((n) => n === turns);
  order = [
    ...counterclockwise.slice(st_index + 1, counterclockwise.length),
    ...counterclockwise.slice(0, st_index),
  ];
  order
    .filter((n) => n !== turns)
    .forEach((n) => {
      establishments
        .filter((est) => est.state === n && est.dice_roll === dice)
        .map((est) => {
          const red = est.red;
          if (!red) return;
          if (incomes[turns] <= red.income) {
            incomes[n as 1 | 2 | 3] += incomes[turns];
            console.log(
              `${est.state} gets ${incomes[turns]} from ${est.title}`
            );
            incomes[turns] = 0;
            return;
          }
          if (incomes[turns] === 0) {
            console.log(
              `${est.state} gets nothing from ${est.title} as ${turns} is broke`
            );
            return;
          }
          if (incomes[turns] > red.income) {
            incomes[turns] -= red.income;
            incomes[n as 1 | 2 | 3] += red.income;
            console.log(`${est.state} gets ${red.income} from ${est.title}`);
            return;
          }
        });
    });
}

function blue_calc(dice: number) {
  establishments
    .filter((e) => e.state !== null && "blue" in e && e.dice_roll === dice)
    .map((e) => {
      const blue_info = e.blue;
      if (!blue_info) return;
      incomes[e.state as 1 | 2 | 3] += blue_info.income;
      console.log(`${e.state} gets ${blue_info.income} from ${e.title}`);
    });
}

function green_calc(turns: 1 | 2 | 3, dice: number) {
  establishments
    .filter((est) => "blue" in est && est.state === turns)
    .map((e) => {
      const blue_info = e.blue;
      if (!blue_info) return;
      for (let tag of blue_info.tags) {
        if (tag in blues[((e.state as number) - 1) as 0 | 1 | 2]) {
          (
            blues[((e.state as number) - 1) as 0 | 1 | 2] as Record<
              string,
              number
            >
          )[tag] += 1;
        } else {
          (
            blues[((e.state as number) - 1) as 0 | 1 | 2] as Record<
              string,
              number
            >
          )[tag] = 1;
        }
      }
    });
  establishments
    .filter((e) => e.state === turns && "green" in e && e.dice_roll === dice)
    .map((e) => {
      const green_info = e.green;
      if (!green_info) return;
      if (!green_info.modifiers) {
        incomes[e.state as 1 | 2 | 3] += green_info.income;
        console.log(`${e.state} gets ${green_info.income} from ${e.title}`);
      } else {
        if (
          green_info.modifiers[0] === "all" &&
          green_info.modifiers[1] in blues[turns - 1]
        ) {
          const accumulated =
            blues[turns - 1][green_info.modifiers[1]] * green_info.income;
          incomes[turns] += accumulated;
          console.log(`${e.state} gets ${accumulated} from ${e.title}`);
        }
      }
    });
  blues = [{}, {}, {}];
}

function calc_turn(player: 1 | 2 | 3, dice: number) {
  console.log(`player ${player} turns, dice roll: ${dice}`);
  red_calc(player, dice);
  blue_calc(dice);
  green_calc(player, dice);
}

let player: 1 | 2 | 3 = 1;
for (let i = 0; i < 40; i++) {
  calc_turn(
    player,
    roll().reduce((pr, c) => pr + c, 0)
  );
  player = (player === 3 ? 1 : (player += 1)) as 1 | 2 | 3;
}
console.log(incomes);
