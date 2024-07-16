import { Elysia, t } from "elysia";
import { roll } from "./initials/roll";
import { red_calc } from "./logic/calc-income";
import { HeroProps, Item, ItemProps } from "./t";
import { cwse } from "./initials/cwse";
import { add, init_pool, start } from "./initials/pool";

const items = init_pool();
add("Tanya", items);
add("Wanda", items);
add("Sasha", items);
add("Natasha", items);
start(items);

const app = new Elysia()
  .ws("/", {
    open(ws) {
      ws.send({ items });
    },
    message(ws, message) {
      const item =
        //@ts-expect-error
        items[message.type as "dice" | "establishment"][message.item as number];
      //@ts-expect-error
      const hero = items.heroes[message.hero as number];
      if (!item || !hero) return;
      hero.state.do(items, item as ItemProps, hero as HeroProps);
      ws.send({ items });
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
