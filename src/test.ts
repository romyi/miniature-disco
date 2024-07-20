import { shuffle } from "fast-shuffle";

const cards = [99, 33, 432, 1, 6, 3300, 9001111, 7, 4, 89, 22, 8821, 111, 66];

function build_shuffle() {
  let c = 0;
  const pointers = [];
  while (c < cards.length) {
    pointers.push(c);
    c += 1;
  }
  return shuffle(pointers);
}

const pointers = build_shuffle();
for (let pointer of pointers) {
  console.log(cards[pointer]);
}
