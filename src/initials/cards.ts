export const B = {
  wheat_field: {
    name: "wheat field",
    state: null,
    title: "establishment",
    dice_roll: 1,
    cost: 1,
    blue: {
      income: 1,
      tags: ["wheat_field", "agriculture"],
    },
  },
  livestock_farm: {
    name: "livestock farm",
    state: null,
    title: "establishment",
    dice_roll: 2,
    blue: {
      income: 1,
      tags: ["livestock_farm", "cattle"],
    },
  },
  forest: {
    name: "forest",
    state: null,
    title: "establishment",
    dice_roll: 5,
    cost: 3,
    blue: {
      income: 1,
      tags: ["forest", "materials"],
    },
  },
  mine: {
    name: "mine",
    state: null,
    title: "establishment",
    dice_roll: 9,
    cost: 6,
    blue: {
      income: 5,
      tags: ["mine", "materials"],
    },
  },
  apple_orchard: {
    name: "apple orchard",
    state: null,
    title: "establishment",
    dice_roll: 10,
    cost: 3,
    blue: {
      income: 3,
      tags: ["apple_orchard", "agriculture"],
    },
  },
} as const;

export const G = {
  bakery: {
    name: "bakery",
    state: null,
    title: "establishment",
    dice_roll: 3,
    cost: 1,
    green: {
      income: 1,
    },
  },
  konbini: {
    name: "konbini",
    state: null,
    title: "establishment",
    dice_roll: 4,
    cost: 2,
    green: {
      income: 3,
    },
  },
  cheese_factory: {
    name: "cheese factory",
    state: null,
    title: "establishment",
    dice_roll: 7,
    cost: 5,
    green: {
      income: 3,
      modifiers: ["all", "livestock_farm"],
    },
  },
  furniture_factory: {
    name: "furniture factory",
    state: null,
    title: "establishment",
    dice_roll: 8,
    cost: 3,
    green: {
      income: 3,
      modifiers: ["all", "materials"],
    },
  },
  produce_market: {
    name: "produce market",
    state: null,
    title: "establishment",
    dice_roll: 11,
    cost: 2,
    green: {
      income: 2,
      modifiers: ["all", "agriculture"],
    },
  },
} as const;

export const R = {
  caffee: {
    name: "caffee",
    state: null,
    title: "establishment",
    dice_roll: 10,
    red: {
      income: 5,
    },
  },
} as const;
