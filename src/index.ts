import { Elysia, t } from "elysia";
import { HeroProps, ItemProps } from "./t";
import { add, init_pool, start } from "./initials/pool";

const items = init_pool();
add("Tanya", items);
add("Wanda", items);
start(items);

const app = new Elysia()
  .ws("/", {
    open(ws) {
      ws.send({ items });
      ws.subscribe("test");
    },
    message(ws, message) {
      //@ts-expect-error
      const hero = items.heroes[message.data.hero];
      if (!hero) return;
      //@ts-expect-error
      hero.state.do(items, message.data);
      ws.publish("test", { items });
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
