const clockwise = [1, 2, 3];
const counterclockwise = clockwise.toReversed();

interface Establishment {
  title: "establishment";
  name: string;
  state: number;
  dice_roll: number;
  red?: { income: number };
  i: number;
}

let incomes = {
  1: 0,
  2: 0,
  3: 0,
};

export function red_calc(
  turns: 1 | 2 | 3,
  dice: number,
  establishments: Establishment[],
  balance: number
) {
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
          if (balance <= red.income) {
            incomes[n as 1 | 2 | 3] += incomes[turns];
            console.log(
              `${est.state} gets ${incomes[turns]} from ${est.title}`
            );
            incomes[turns] = 0;
            return;
          }
          if (balance === 0) {
            console.log(
              `${est.state} gets nothing from ${est.title} as ${turns} is broke`
            );
            return;
          }
          if (balance > red.income) {
            incomes[turns] -= red.income;
            incomes[n as 1 | 2 | 3] += red.income;
            console.log(`${est.state} gets ${red.income} from ${est.title}`);
            return;
          }
        });
    });
  console.log(incomes);
}
