const array = new Uint8Array(2);

export function roll() {
  const dices = [];
  self.crypto.getRandomValues(array);
  for (const num of array) {
    const dice = num / 6;
    if (dice < 7) {
      dices.push(1);
    } else if (dice < 14) {
      dices.push(2);
    } else if (dice < 21) {
      dices.push(3);
    } else if (dice < 28) {
      dices.push(4);
    } else if (dice < 35) {
      dices.push(5);
    } else if (dice < 43) {
      dices.push(6);
    }
  }
  return dices as [number, number];
}
